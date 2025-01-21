import React from "react";
import "react-photo-view/dist/react-photo-view.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ProjectMeta } from "./types";

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

export const fileFetchServiceMeta: ProjectMeta = {
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
      <h3>Problem to Solve</h3>
      <p>
        My team was asked to provide 5 years worth of report data, which amounted to 18 million files totalling some 90
        TB of data. This data was already accessible if one had credentials for client APIs, but it was determined that
        fetching it via existing APIs in the window of time needed would impose too much added load onto production
        systems, potentially impacting customers in a negative way.
      </p>

      <p>
        Additionally, due to the potential presence of PII in the data, we instigated a security review to ensure we are
        allowed to provide access to the files, and if so, define the protective measures we should factor into the
        design.
      </p>

      <h4>Requirements</h4>
      <ul>
        <li>Should be a new service, separate from production APIs in use by customers.</li>
        <li>Must be low latency and highly available to enable efficient file download.</li>
        <li>Must be within project budgetary constraints.</li>
        <li>Must be secure, requiring oAuth2 authentication and JWT authorization.</li>
        <li>
          Source metadata lists may include duplicate entries and so batch fetching must dedupe efficiently prior to
          fetching and serving files.
        </li>
      </ul>

      <h4>Solution</h4>
      <p>
        An AWS Lambda backed service behind an API Gateway was created, with small and efficient handlers designed with
        logic that knows how to reach the destination files. A VPC S3 endpoint was created to direct traffic on private
        subnets rather than over the internet. Additionally, a batch fetch endpoint was made available at `POST /files`
        that accepted a JSON encoded array of values, offering a more efficient way to retrieve multiple files in one
        request.
      </p>

      <p>
        The resulting solution would validate the existence of the requested files, then return temporary pre-signed S3
        URLs for download.
      </p>

      <h4>Outcome</h4>
      <p>
        At full capacity, the service could serve 500 file requests per second, with a per-file latency factor of 10ms.
        The complete fileset fetching took less than a week and was well within budgetary limits. Most importantly,
        there was zero impact to customers.
      </p>

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
