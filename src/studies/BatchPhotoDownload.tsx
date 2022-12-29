import React from "react";
import "react-photo-view/dist/react-photo-view.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { StudyMeta } from "./types";

export const codeSample = `use GuzzleHttp\\Pool;
use GuzzleHttp\\Client;
use GuzzleHttp\\Psr7\\Request;

$app->get('/api/v1/photos/:reportid(/)', 'requireLogin', function ($reportId) use ($app) {
    if ($report = ReportORM::find($reportId)) {
        $zip = new ZipArchive();
        $filename = Slug::generate(App::getClientId() . '-' . $report->getAddress()) . '-photos.zip';
        $path = '/tmp/' . $filename;
        touch($path);

        if ($zip->open($path) !== true) {
            App::returnJson(['message' => 'There was a problem creating the photo zip file'], 500);
        }

        $xmlReport = $report->getXmlReport();
        $filteredPhotoRefs = array_filter($xmlReport->getPhotoRefs(), function (\\Report\\PhotoRef $photoRef) { return !$photoRef->isDeleted(); });

        $client = new Client();

        $requests = function () use ($filteredPhotoRefs) {
            foreach ($filteredPhotoRefs as $photoRef) {
                yield new Request('GET', $photoRef->getSrc());
            }
        };

        $pool = new Pool($client, $requests(), [
            'concurrency' => 50,
            'fulfilled' => function ($response, $index) use ($filteredPhotoRefs, $zip) {
                $zip->addFromString($filteredPhotoRefs[$index]->getUUID() . '.jpeg', (string)$response->getBody());
            },
            'rejected' => function ($reason, $index) {
                // TODO: implement try again?
            },
        ]);

        // Initiate the transfers and create a promise
        $promise = $pool->promise();

        // Force the pool of requests to complete.
        $promise->wait();

        $zip->close();

        $result = S3::putFile('one-day-temp', $filename, $path, ['returnResult' => true]);

        App::returnJson(['url' => $result['ObjectURL']]);

    } else {
        App::returnJson(['message' => 'Unable to find report with ID ' . $reportId], 404);
    }
});
`;

export const batchPhotoDownloadMeta: StudyMeta = {
  title: "Batch Photo Download",
  name: "batch-photo-download",
  path: "/batch-photo-download",
};

const BatchPhotoDownload: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);

  return (
    <div id={batchPhotoDownloadMeta.name}>
      <p>
        The CloudInspect SaaS application allowed users to upload an unlimited
        number of images, typically taken from their phone, tablet, or digital
        camera. At some point after the product's release, multiple customers
        voiced a need to download all of the photos they've added to any one
        report.
      </p>
      <p>
        The first step in preparing for this project was to figure out, on
        average, how many images are uploaded for any one report. With that
        figure, we can determine how to best design this feature. Knowing there
        were an average of 80 photos per report, it was determined a simple
        request pool & zip file solution would work well.
      </p>
      <div className={"font-bold"}>Business Requirements:</div>
      <ul>
        <li>Triggered via a download button in the application</li>
        <li>
          Must not take an unreasonable amount of time to complete relative to
          the number of photos in the report
        </li>
      </ul>
      <div className={"font-bold"}>Design Considerations:</div>
      <ul>
        <li>Guzzle has many built-in features, including a Request Pool</li>
        <li>
          The images are already resized & compressed, thus the average file
          size is only 100 KB, allowing for fast download
        </li>
        <li>
          Through testing, it was found that setting the concurrency to 50
          at-any-one-time meant the average report of 80 photos was only taking
          3 seconds to download, zip, and send to the user's browser
        </li>
      </ul>
      <div>
        <span className={"font-bold"}>Developer team size:</span> 1 (fullstack)
      </div>
      <div>
        <span className={"font-bold"}>Time to production:</span> 5 days
      </div>

      <div className={"italic text-md"}>
        Note: This is a best attempt recreation to protect IP
      </div>

      <div className={"font-bold"}>photoDownload.php</div>
      <SyntaxHighlighter
        language="php"
        style={docco}
        showLineNumbers={true}
        showInlineLineNumbers={true}
        className={"mt-0"}
      >
        {codeSample}
      </SyntaxHighlighter>
    </div>
  );
};

export default BatchPhotoDownload;
