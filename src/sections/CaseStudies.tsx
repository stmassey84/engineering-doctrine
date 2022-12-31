import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import Title from "./Title";
import { SectionMeta } from "./types";
import { studiesMetaData } from "../studies";

export const caseStudiesMeta: SectionMeta = {
  title: "Case Studies / Projects",
  name: "case-studies",
  path: "/",
};

const CaseStudies: React.FC = () => {
  const { toggleSectionInView } = useApp();
  const { ref, inView } = useInView();

  React.useEffect(() => {
    toggleSectionInView(caseStudiesMeta.name, inView);
  }, [toggleSectionInView, inView]);

  return (
    <div id={caseStudiesMeta.name} ref={ref}>
      <Title title={caseStudiesMeta.title} />
      <h4>Case Studies:</h4>
      <ol>
        {Object.values(studiesMetaData).map((study) => (
          <li key={study.name}>
            <Link to={study.path}>{study.title}</Link>
          </li>
        ))}
      </ol>
      <h4>Other Projects:</h4>
      <p className={"italic"}>Note: Not an all-inclusive list</p>
      <ul>
        <li>
          <h5 className={"font-bold"}>ERP Architectural Overhaul</h5>
          - Designed & directed, and assisted in the implementation of a nearly
          complete swap of production infrastructure
          <br />
          - Planning & development lasted about 3 months
          <br />
          - Actual implementation was during a single weekend
          <br />
          - No unexpected outages. Scheduled outage of 1 hour.
          <br />
          - Allowed for deployments to take 99% less time (days/hours to
          minutes/seconds)
          <br />
          - Allowed for builds to take 50% less time
          <br />- Provided new Python APIs & scripts for remote commands
        </li>
        <li>
          <h5 className={"font-bold"}>Major Production Database Upgrade</h5>
          - Planned & facilitated a large increase in MySQL version
          <br />
          - 12 RDS clusters needed upgrade
          <br />
          - Some of these clusters contained several terabytes of data
          <br />
          - Orchestrated the upgrade over 6 weekends, doing 2 clusters per
          weekend
          <br />
          - Followed a strict process to mitigate data loss & inform customers
          of planned outage time
          <br />- Utilized instance failover method for less downtime
        </li>
        <li>
          <h5 className={"font-bold"}>Credit Card Processing</h5>
          - Created common interface for interacting with payment gateway APIs
          <br />
          - At its zenith, the ERP application integrated with 11 payment
          gateways
          <br />
          - Legacy integrations were based on text or XML
          <br />
          - Newer integrations were all based on REST APIs
          <br />- This code serves about 5,700 payments per day
        </li>
        <li>
          <h5 className={"font-bold"}>ACH Payment Processing</h5>
          - In concert with my senior engineers, created an event driven feature
          for allowing clients to make ACH payments
          <br />
          - Based on the NACHA PPD/CCD formatting
          <br />- Payments batched daily, uploaded via SFTP
        </li>
        <li>
          <h5 className={"font-bold"}>HTML to PDF Service</h5>
          - Created a microservice to serve requests to convert HTML to PDF
          <br />
          - Went through numerous libs, including html2pdf, pdftk, ghostscript,
          etc, until settling on a paid product (PrinceXML)
          <br />
          - Pdftk & ghostscript still used for metadata extraction & merging
          <br />- Serves about 20,000 documents per month
        </li>
        <li>
          <h5 className={"font-bold"}>Migration to React</h5>
          - Created bootstrap class to load React into a legacy template
          container
          <br />
          - Can inject server-side data into the DOM, or simply request it via
          AJAX
          <br />
          - Created webpack build process for generating minified files, then
          dynamically loading them
          <br />- Eventually added TypeScript support
        </li>
        <li>
          <h5 className={"font-bold"}>Legacy SOAP API</h5>
          - Helped to create & maintain a SOAP API which allowed for an older
          application to connect & pass data to/from our databases
          <br />
          - Incepted into production circa 2008
          <br />- Sunsetted summer 2022
        </li>
      </ul>
    </div>
  );
};

export default CaseStudies;
