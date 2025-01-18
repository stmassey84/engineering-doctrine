import React from "react";
import "react-photo-view/dist/react-photo-view.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { StudyMeta } from "./types";

export const codeSampleHelpers = `const s3 = new S3();

interface FileArgs {
    fileBin: string,
    companyId: string,
    file: string
}

/**
 * @param companyId
 * @param file
 * @return string
 */
const getFilePath = (companyId: string, file: string): string => {
    const dateEndIndex = file.indexOf('-');
    const date = file.substring(0, dateEndIndex);
    const fileName = file.substring(dateEndIndex+1);
    return \`\${companyId}/\${date}/\${fileName}\`;
};

/**
 * @function getFileUrl
 * @param fileData
 * @return Promise<string>
 */
const getFileUrl = async (fileData: FileArgs): Promise<string> => {
    return new Promise((resolve, reject) => {

        const {fileBin, companyId, file} = fileData;
        const filePath = getFilePath(companyId, fileBin);

        let s3req: S3.HeadObjectRequest = {
            Bucket: \`\${process.env.BUCKET_PREFIX}\${bin}\`,
            Key: filePath
        };

        s3.headObject(s3req)
            .promise()
            .then(head => {
                const linkReq = {
                    ...s3req,
                    Expires: 3600,
                    ResponseContentDisposition: \`attachment; filename="\${file}"\`
                };

                resolve(s3.getSignedUrl('getObject', linkReq));
            })
            .catch(error => {
                console.error(error);
                reject(error.code);
            });

    });
};

type FileUrlsRet = {
    inputCount: number,
    dedupeCount: number,
    errorCount: number,
    data: string[]
}

const getFileKey = (file: FileArgs): string => \`\${file.fileBin}_\${file.companyId}_\${file.file}\`;

/**
 * @function getFileUrls
 * @param files
 * @return Promise<FileUrlsRet>
 */
const getFileUrls = async (files: FileArgs[]): Promise<FileUrlsRet> => {
    return new Promise((resolve, reject) => {
        const dedupedFiles = files.filter((file, index, array) => {
             const key = getFileKey(file);
             return array.findIndex(f => getFileKey(f) === key) === index
        });
        const results = {};

        for (let file of dedupedFiles) {
            results[getFileKey(file)] = '';
        }

        // track error count
        let errorCount = 0;

        const promises = dedupedFiles.map(async (file: FileArgs) => {
            const key = getFileKey(file);
            try {
                results[key] = await getFileUrl(file);
            } catch (error) {
                results[key] = error;
                errorCount += 1;
            }
        });

        Promise.all(promises).then(() => resolve({
            inputCount: files.length,
            dedupeCount: dedupedFiles.length,
            errorCount,
            data: Object.values(results)
        }));
    });
};

export default {
    getFileUrl,
    getFileUrls
}
`;

const codeSampleHandler = `/**
* @function getFileUrl
* @param event
* @param context
* @description:
* Returns a singular, signed URL
*/
export const getFileUrl: APIGatewayProxyHandler = async (
   event: APIGatewayEvent,
   context: Context
): Promise<any> => {
   let {fileBin = '', companyId = '', file = '', asJson = undefined} = event.queryStringParameters || {};

   if (!fileBin) {
       return jsonOutBadRequest('Please provide a valid fileBin query parameter',
           fileBin);
   }

   if (!companyId) {
       return jsonOutBadRequest('Please provide a valid companyId query parameter',
           companyId);
   }

   if (!file) {
       return jsonOutBadRequest('Please provide a valid file query parameter',
           file);
   }

   if (typeof asJson === 'undefined') {
       asJson = false;
   }

   console.log('NOTE: Attempting to fetch file URL for: (' + fileBin + '/' + companyId + '/' + file + ')');

   try {
       const url = await Helpers.getFileUrl({fileBin, companyId, file});
       if (asJson) {
           return jsonOutSuccess('getreporturl', url);
       }
       return bounce(url);
   } catch (e) {
       return jsonOutNotFound('Unable to locate file with the provided parameters', fileBin + '/' + companyId + '/' + file);
   }
};

/**
* @function getFileUrls
* @param event
* @param context
* @description:
* Accepts an array of objects in the POST body, then attempts to get signed URLs and return them in the same order
*/
export const getFileUrls: APIGatewayProxyHandler = async (
   event: APIGatewayEvent,
   context: Context
): Promise<any> => {
   const data = JSON.parse(event.body) || [];

   if (!data.length) {
       return jsonOutBadRequest('Please provide a valid array of objects in the body, e.g.:' +
           ' [{"fileBin":"...","companyId":"...","file":"..."}]');
   } else if (data.length > 500) {
       return jsonOutBadRequest('Please limit the provided array of no more than 500 objects (<=500)', data);
   }

   console.log('NOTE: Attempting to fetch file URLs for ' + data.length + ' file entries');

   try {
       const res = await Helpers.getFileUrls(data);
       return jsonOutCustomBody({
           status: 'ok',
           message: 'getreporturls',
           ...res
       });
   } catch (e) {
       return jsonOutError('An error was encountered');
   }
};
`;

export const fileFetchServiceMeta: StudyMeta = {
  title: "File Fetch Service",
  name: "file-fetch",
  path: "/file-fetch",
};

const FileFetchService: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);

  return (
    <div id={fileFetchServiceMeta.name}>
      <p>
        On short notice, a sister BU requested that our engineering team (1)
        export 5 years worth of file metadata (client id, file id, file prefix)
        to csv and (2) provide them a way to fetch the individual files as
        short-expiry URLs over the course of 30 days. They needed to throttle
        the daily volume so they could ingest the files into a ML pipeline, then
        tweak that process as more files produce more results, which would ramp
        the request volume up until there were no more files to fetch.
      </p>
      <p>
        The quickest way for them to start this was to simply go through our
        public, client facing API, however this would add considerable load &
        cost by increasing daily request volume & hitting bottlenecks. Our
        scaling was configured to handle some arbitrary margin above and below
        the median, and we calculated that this event would push it way above,
        possibly impacting end-user experience (unacceptable.)
      </p>
      <p>
        Instead, we posited that an auxiliary service, which exposed 2 API
        endpoints (/file & /files) and would allow full circumvention of all
        client facing infrastructure. This service would understand how to
        construct the file prefixes. It was also calculated to cost about $1000
        for the entire backfill duration, much lower than the increased cost
        from production servers.
      </p>
      <div className={"font-bold"}>Business Requirements:</div>
      <ul>
        <li>
          It's a cost center from the get-go, and while keeping the price low is
          ideal, it is not a blocker
        </li>
        <li>Needed for file ingestion start within 2 weeks</li>
        <li>Capable of handling dozens of requests per second</li>
        <li>
          Should stay up after the initial backfill is done, providing a long
          term avenue for a lower-over-time volume, which would likely stay
          within AWS' free tier
        </li>
      </ul>
      <div className={"font-bold"}>Design Considerations:</div>
      <ul>
        <li>Files stored in S3</li>
        <li>Use Lambda to fetch and return signed URLs</li>
        <li>Use API Gateway for request routing</li>
        <li>
          Batch file option with return array of objects containing either a
          valid URL, or an error message if failed
        </li>
        <li>Dedupe built in for batch requests</li>
        <li>Goal of &lt;= 60 ms per individual file request (GET /file)</li>
        <li>
          Goal of &lt;= 120 ms per batch file request (POST / files), far more
          efficient this way
        </li>
        <li>
          Webpack build files should be minimized (5 KB), meaning less 3rd party
          libraries for quicker lamba initialization
        </li>
        <li>
          Provisioned concurrency for backfill, keeping enough instances warm to
          fulfill 50 requests per second
        </li>
      </ul>
      <div>
        <span className={"font-bold"}>Developer team size:</span> 1 (fullstack)
      </div>
      <div>
        <span className={"font-bold"}>Time to market:</span> 3 days (1/4th
        sprint)
      </div>

      <div className={"italic text-md"}>
        Note: This is a best attempt recreation to protect IP
      </div>

      <div className={"font-bold"}>helpers.ts</div>
      <SyntaxHighlighter
        language="typescript"
        style={docco}
        showLineNumbers={true}
        showInlineLineNumbers={true}
        className={"mt-0"}
      >
        {codeSampleHelpers}
      </SyntaxHighlighter>

      <div className={"font-bold"}>handler.ts</div>
      <SyntaxHighlighter
        language="typescript"
        style={docco}
        showLineNumbers={true}
        showInlineLineNumbers={true}
        className={"mt-0"}
      >
        {codeSampleHandler}
      </SyntaxHighlighter>
    </div>
  );
};

export default FileFetchService;
