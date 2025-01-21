import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ProjectMeta } from "./types";

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

export const batchPhotoDownloadMeta: ProjectMeta = {
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
      <h3>Problem to Solve</h3>
      <p>
        Users of our proprietary report writing software reported long delays when using the "Download all photos"
        button. This feature would bundle all photos up then send the ZIP file to the user/client. The functionality
        behind this was scaling in a sublinear fashion, taking longer with each photo included in the request.
      </p>

      <p>
        It was determined that past 10 photos, there was an overhead cost of 100ms per file, leading to a sub-optimal
        linear scaling problem.
      </p>

      <h4>Requirements</h4>
      <ul>
        <li>The UX must stay unchanged.</li>
        <li>The wait time for batch photo downloads should be reduced by at minimum a factor of 3.</li>
        <li>There must not be significant added infrastructure cost related to changes to improve performance.</li>
      </ul>

      <h4>Solution</h4>
      <p>
        The chosen solution was to parallelize the photo file fetch process for the zip file combination. This was
        achieved using a network-optimized fetch via the Guzzle connection pooling feature. The existing fetch
        technology was retained but threaded to gain efficient multiple file-fetch performance without added
        infrastructure cost.
      </p>

      <h4>Outcome</h4>
      <p>
        The optimization reduces the constant factor driving the cost of scaling. Previously, each additional photo
        incurred a 100ms penalty, resulting in high per-photo overhead. After optimization, the penalty is amortized
        across batches, reducing the effective cost per photo to just 10ms. While the scaling remains O(n), the
        practical improvement is substantial: for 100 photos, the time drops from approximately 10 seconds to 1.9
        seconds, demonstrating a tenfold efficiency gain in per-photo overhead.
      </p>

      <PhotoProvider>
        <PhotoView src={"images/b11c836a-e870-43e9-a606-73fd2c53adbd.png"}>
          <img
            src={"images/b11c836a-e870-43e9-a606-73fd2c53adbd.png"}
            alt={"Post-optimization improvement graph"}
            className={"object-fit w-screen"}
          />
        </PhotoView>
      </PhotoProvider>

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
