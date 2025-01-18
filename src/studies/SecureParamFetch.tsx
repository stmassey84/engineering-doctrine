import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { StudyMeta } from "./types";

export const secureParamFetchMeta: StudyMeta = {
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
      <p>
        Our previous gen architecture had a severe bottleneck: Each client had a
        config file with their specific DSN for database access. This meant our
        runtime had to read this file for every request. Analysis of the request
        call stack determined this single operation represented 20% of the time
        the server side portion of the request was taking. We needed to remove
        this bottleneck.
      </p>
      <div className={"font-bold"}>Business Requirements:</div>
      <ul>
        <li>Keep architecture in place</li>
        <li>Replace hard coded config files with something better/faster</li>
        <li>
          It is ideal to have minimal to no downtime when changing to this
          system
        </li>
        <li>
          Each request must perform as fast as current, but ideally faster
        </li>
      </ul>
      <div className={"font-bold"}>Design Considerations:</div>
      <ul>
        <li>
          Review credentials access grants to ensure they are limited only to
          what the application specifies it requires
        </li>
        <li>
          Protect against stampede by keeping an encrypted copy of credentials
          on disk
        </li>
        <li>
          Prepare to intake millions of requests per day with no degradation
        </li>
        <li>
          A warm instance (values in RAM) should allow credential access in 2 ms
          on average
        </li>
        <li>
          A cold instance (values in store) should allow credential access in
          sub 50 ms on average
        </li>
        <li>
          If credentials do not exist, the application must error gracefully &
          notify the sysadmin
        </li>
        <li>
          If a new database cluster credentials are added, the application must
          be able to retrieve the new credentials without any code release
        </li>
      </ul>
      <div>
        <span className={"font-bold"}>Developer team size:</span> 1 (fullstack)
      </div>
      <div>
        <span className={"font-bold"}>Time to production:</span> 2 weeks (1
        sprint)
      </div>
      <PhotoProvider>
        <PhotoView src={"images/diagram_secure_param_fetch.png"}>
          <img
            src={"images/diagram_secure_param_fetch.png"}
            alt={"Secure Parameter Fetch Design Schematic"}
            className={"object-fit w-screen"}
          />
        </PhotoView>
      </PhotoProvider>
    </div>
  );
};

export default SecureParamFetch;
