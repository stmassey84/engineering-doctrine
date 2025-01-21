import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { ProjectMeta } from "./types";
import Card, { NewWindowIcon } from "../components/Card";

export const cloudInspectMeta: ProjectMeta = {
  title: "Report Writer",
  name: "cloudinspect",
  path: "/cloudinspect",
};

const CloudInspect: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);

  return (
    <div id={cloudInspectMeta.name}>
      <h3>Problem to Solve</h3>
      <p>
        Two of our customers needed to modernize their report writing software, which hadn't seen significant
        improvement in well over a decade. The customers, which are medium to large franchises, stated their desire to
        move towards a web-based solution. The customer's current application was bound to the Windows Operating System
        only, and it had no internet capabilities. It was also impossible for users to collaborate on the same document
        due to these restrictions.
      </p>

      <h4>Requirements</h4>
      <ul>
        <li>Mobile friendly, especially optimized for tablets.</li>
        <li>Multi-browser support.</li>
        <li>Must leverage AWS services for all backend technologies.</li>
        <li>Redundant with client/browser storage for unsaved cloud data.</li>
        <li>Support multiple users editing the same document.</li>
        <li>Efficient photo upload.</li>
        <li>Robust PDF generation support.</li>
      </ul>

      <h4>Solution</h4>
      <p>
        A Software-as-a-Service design was created, comprised of ALB & Elasticbeanstalk EC2 for backend API, RDS MySQL
        and S3 for data storage, and Cloudfront & S3 to serve the Angular frontend. Additional components for
        optimization were added over time, such as Redis for caching and SQS to facilitate asynchronous jobs.
      </p>

      <ul>
        <li>IndexedDB for client side data redundancy.</li>
        <li>Client side compression for photo upload.</li>
        <li>
          Data input and photo insertion must be stored client side prior to be saved to non-volatile storage (SQL/S3).
        </li>
        <li>
          If data are entered or photos added, they must be considered "dirty" until confirmation of a positive
          server-side save is returned.
        </li>
        <li>
          If a save fails, the data is still considered unsaved. Exiting or reloading the application will not change
          the state.
        </li>
        <li>
          Retry save until a successful one is achieved. Provide user feedback that there has been trouble saving.
        </li>
        <li>
          The local JSON structure is composed into a linked JSON object, with the report being the root element,
          sections and pages being branches, subsections and html elements being twigs of those branches, and controls
          being leaves.
        </li>
      </ul>

      <PhotoProvider>
        <PhotoView src={"images/diagram_cloudinspect.png"}>
          <img
            src={"images/diagram_cloudinspect.png"}
            alt={"CloudInspect Data Redundancy Design Schematic"}
            className={"object-fit w-screen"}
          />
        </PhotoView>
      </PhotoProvider>

      <h4>Outcome</h4>
      <p>
        After the service was properly beta tested and live in production, user adoption began. At its maximum usage,
        the service had 1500 Active Users, with 750 Average Daily Users. It generated upwards of $275,000 in ARR, while
        costing a small fraction of that to operate and maintain. The service was in use for 12 years, with recent
        improvements in technology beginning to make it obsolete.
      </p>

      <div className={"font-bold"}>Client Side Data Redundancy</div>
      <div className={"italic text-md"}>
        Note: This is a best attempt recreation to protect IP. It has also been refactored in TypeScript.
      </div>
      <Card title={"IDBInterface.ts"}>
        <p className={"mb-3 font-normal text-gray-500 dark:text-gray-400"}>
          Defines & implements an interface to the local IndexedDB
        </p>
        <a
          href={
            "https://gist.github.com/stmassey84/be722e0f9b41d792ab6796a4cee37911#file-reportwriterdataredundancy-ts-L5"
          }
          target={"_blank"}
          rel={"noreferrer"}
          className={"inline-flex items-center text-blue-600 hover:underline"}
        >
          View on Gist
          <NewWindowIcon />
        </a>
      </Card>
      <Card title={"Control.ts"} className={"mt-2"}>
        <p className={"mb-3 font-normal text-gray-500 dark:text-gray-400"}>
          Defines & implements the pseudo abstract parent control class, which other controls will extend
        </p>
        <a
          href={
            "https://gist.github.com/stmassey84/be722e0f9b41d792ab6796a4cee37911#file-reportwriterdataredundancy-ts-L75"
          }
          target={"_blank"}
          rel={"noreferrer"}
          className={"inline-flex items-center text-blue-600 hover:underline"}
        >
          View on Gist
          <NewWindowIcon />
        </a>
      </Card>
      <Card title={"Checkbox.ts"} className={"mt-2"}>
        <p className={"mb-3 font-normal text-gray-500 dark:text-gray-400"}>
          Extends the Control class to implement a simple binary control for checkbox rendering
        </p>
        <a
          href={
            "https://gist.github.com/stmassey84/be722e0f9b41d792ab6796a4cee37911#file-reportwriterdataredundancy-ts-L215"
          }
          target={"_blank"}
          rel={"noreferrer"}
          className={"inline-flex items-center text-blue-600 hover:underline"}
        >
          View on Gist
          <NewWindowIcon />
        </a>
      </Card>
      <Card title={"Report.ts"} className={"mt-2"}>
        <p className={"mb-3 font-normal text-gray-500 dark:text-gray-400"}>
          Creates the primary Report structure, which contains all controls and handles committing and hydration via
          IndexedDB
        </p>
        <a
          href={
            "https://gist.github.com/stmassey84/be722e0f9b41d792ab6796a4cee37911#file-reportwriterdataredundancy-ts-L244"
          }
          target={"_blank"}
          rel={"noreferrer"}
          className={"inline-flex items-center text-blue-600 hover:underline"}
        >
          View on Gist
          <NewWindowIcon />
        </a>
      </Card>
      <Card title={"App.ts"} className={"mt-2"}>
        <p className={"mb-3 font-normal text-gray-500 dark:text-gray-400"}>
          A sample of how this application might be used in practice
        </p>
        <a
          href={
            "https://gist.github.com/stmassey84/be722e0f9b41d792ab6796a4cee37911#file-reportwriterdataredundancy-ts-L470"
          }
          target={"_blank"}
          rel={"noreferrer"}
          className={"inline-flex items-center text-blue-600 hover:underline"}
        >
          View on Gist
          <NewWindowIcon />
        </a>
      </Card>
    </div>
  );
};

export default CloudInspect;
