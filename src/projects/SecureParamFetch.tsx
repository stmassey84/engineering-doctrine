import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { ProjectMeta } from "./types";

export const secureParamFetchMeta: ProjectMeta = {
  title: "Secure Parameter Fetch",
  name: "secure-param-fetch",
  path: "/secure-param-fetch",
};

const SecureParamFetch: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);

  return (
    <div id={secureParamFetchMeta.name}>
      <h3>Problem to Solve</h3>
      <p>
        In an effort to improve performance of our APIs, we analyzed our request call stack. From this analysis, we
        learned that a specific file, stored on the disk of each server, was opened & its contents read every request.
        This operation represented 100ms or 20% of the total request time, becoming a clear area for optimization.
      </p>

      <p>
        The file in question contained a client DSN, with a copy of this file being present in each customer's copy of
        our checked out repository, but with customer specific connection details inserted.
      </p>

      <h4>Requirements</h4>
      <ul>
        <li>Server architecture and software must remain unchanged.</li>
        <li>No downtime when replacing the DSN file with a runtime solution.</li>
        <li>Reduce the time taken to retrieve the DSN data from an average of 100ms to &lt;= 20ms.</li>
        <li>Ensure the credentials for the DSN are stored securely and with cache invalidation.</li>
      </ul>

      <h4>Solution</h4>
      <p>
        The chosen solution was to create a new DynamoDB backed service, where a map of customerIDs to DSNs could be
        stored. The DynamoDB table was encrypted at rest with a custom KMS key, rotated on a weekly basis. The table had
        security through IAM role restrictions, allowing only our API to read from it, and our utility service to write
        to it for DSN & credentials updates.
      </p>

      <p>
        DynamoDB's DAX service was activated, providing a single digit millisecond response time endpoint. To prevent
        stampedes, DSN credentials were cached in PHP's APCu memory. This also reduced reliance on calls to the DAX
        endpoint. DSNs were updated via our utility service, which would also invalidate APCu cache on each server,
        forcing a data refresh.
      </p>

      <PhotoProvider>
        <PhotoView src={"images/diagram_secure_param_fetch.png"}>
          <img
            src={"images/diagram_secure_param_fetch.png"}
            alt={"Secure Parameter Fetch Design Schematic"}
            className={"object-fit w-screen"}
          />
        </PhotoView>
      </PhotoProvider>

      <h4>Outcome</h4>
      <p>
        The results were clear: the maximum time measured for a cold DSN fetch was 57ms, already a 50% improvement, but
        most requests were &lt;= 2ms, a 98% decrease in latency. This improved overall API latency, further secured our
        database credentials, and provided an easy way to manage updates.
      </p>
    </div>
  );
};

export default SecureParamFetch;
