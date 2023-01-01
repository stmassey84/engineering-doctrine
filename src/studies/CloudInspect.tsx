import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { StudyMeta } from "./types";
import Card, { NewWindowIcon } from "../components/Card";

export const cloudInspectMeta: StudyMeta = {
  title: "CloudInspect",
  name: "cloudinspect",
  path: "/cloudinspect",
};

const CloudInspect: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);

  return (
    <div id={cloudInspectMeta.name}>
      <p>
        A SaaS application designed to serve as an Inspection Report Writer,
        enabling residential & commercial inspectors to write-as-they-go. This
        product & its systems were designed for maximum redundancy, because you
        never know when the inspector's laptop, tablet, or phone may quit
        working, or when their connectivity may deteriorate or disconnect
        entirely. Data integrity is of paramount importance to inspectors. When
        they get back to their office for final report preparation, prior to
        sending the report out to the prospective home buyer, they want to see
        every character entered, every photo added, and every checkbox
        appropriately modified.
      </p>
      <div className={"font-bold"}>Business Requirements:</div>
      <ul>
        <li>"Mobile 1st"</li>
        <li>Leverage client side disk for data redundancy</li>
        <li>Control change and history</li>
        <li>
          Multi-input (HTML/wysiwyg, checkbox, dropdown, image insertion, etc)
        </li>
        <li>Photo upload</li>
        <li>HTML to PDF</li>
      </ul>
      <div className={"font-bold"}>Design Considerations:</div>
      <ul>
        <li>
          IndexedDB for client side disk access (30% of free disk available)
        </li>
        <li>Client side compression for photo upload (bandwidth saver)</li>
        <li>
          Data input and photo insertion must be stored client side prior to be
          saved to non-volatile storage (SQL/S3)
        </li>
        <li>
          If data are entered or photos added, they must be considered “unsaved”
          until confirmation of a positive server-side save is returned
        </li>
        <li>
          If a save fails, the data is still considered unsaved. Exiting or
          reloading the application will not change the state.
        </li>
        <li>
          Retry save until a successful one is achieved. Provide user feedback
          that there has been trouble saving.
        </li>
        <li>
          The local JSON structure is composed into a linked tree, with the
          report being the root element, sections and pages being branches,
          subsections and html elements being twigs of those branches, and
          controls being leaves. This structure has to be converted into a JSON
          array of objects, and this is done in recursive fashion.
        </li>
      </ul>
      <div>
        <span className={"font-bold"}>Developer team size:</span> 1 (fullstack)
      </div>
      <div>
        <span className={"font-bold"}>Time to market:</span> 10 months
        (waterfall)
      </div>
      <PhotoProvider>
        <PhotoView src={"images/diagram_cloudinspect.png"}>
          <img
            src={"images/diagram_cloudinspect.png"}
            alt={"CloudInspect Data Redundancy Design Schematic"}
            className={"object-fit w-screen"}
          />
        </PhotoView>
      </PhotoProvider>

      <div className={"font-bold"}>Client Side Data Redundancy</div>
      <div className={"italic text-md"}>
        Note: This is a best attempt recreation to protect IP. It has also been
        refactored in TypeScript.
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
          Defines & implements the pseudo abstract parent control class, which
          other controls will extend
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
          Extends the Control class to implement a simple binary control for
          checkbox rendering
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
          Creates the primary Report structure, which contains all controls and
          handles committing and hydration via IndexedDB
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
