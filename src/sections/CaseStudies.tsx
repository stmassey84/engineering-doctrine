import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import Title from "./Title";
import Tag, { TagColor } from "../components/Tag";
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
          <div>
            <h5 className={"inline-block font-bold"}>
              ERP Architectural Overhaul
            </h5>
            <div className={"md:inline-block"}>
              <Tag color={TagColor.WHITE} text={"Systems"} />
              <Tag color={TagColor.GREEN} text={"DevOps"} />
              <Tag color={TagColor.BLUE} text={"Coding"} />
            </div>
          </div>
          - Designed, directed, and assisted in the implementation of a nearly
          complete swap of production infrastructure
          <br />
          - Planning & development lasted about 3 months
          <br />
          - Actual implementation was during a single weekend
          <br />
          - Scheduled outage of 1 hour. No unexpected outages.
          <br />
          - New configuration allows for builds & deployments to take 99% less
          time (days/hours to minutes/seconds)
          <br />- Provided new Python APIs & scripts for remote commands
        </li>
        <li>
          <div>
            <h5 className={"inline-block font-bold"}>
              Major Production Database Upgrade
            </h5>
            <div className={"md:inline-block"}>
              <Tag color={TagColor.WHITE} text={"RDBMS"} />
              <Tag color={TagColor.GREEN} text={"DevOps"} />
              <Tag color={TagColor.BLUE} text={"Coding"} />
            </div>
          </div>
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
          <div>
            <h5 className={"inline-block font-bold"}>Data Warehouse</h5>
            <div className={"md:inline-block"}>
              <Tag color={TagColor.WHITE} text={"RDBMS"} />
              <Tag color={TagColor.GREEN} text={"DevOps"} />
              <Tag color={TagColor.ORANGE} text={"API"} />
              <Tag color={TagColor.BLUE} text={"Coding"} />
            </div>
          </div>
          - Designed & implemented multi-tenant SQL schema
          <br />
          - Has ORM layer generated from XML
          <br />
          - Stores shallow copy of single-tenant databases
          <br />
          - Normalized to reduce duplicative FK associations
          <br />
          - Data modified on event driven & timer basis
          <br />
          - Combination of Bash, Python, and PHP scripts for data operations
          <br />- Heavily relied on by company data analytics & accounting teams
          to create ledgers, trends, and audits
        </li>
        <li>
          <div>
            <h5 className={"inline-block font-bold"}>Credit Card Processing</h5>
            <div className={"md:inline-block"}>
              <Tag color={TagColor.WHITE} text={"Feature"} />
              <Tag color={TagColor.ORANGE} text={"API"} />
              <Tag color={TagColor.BLUE} text={"Coding"} />
            </div>
          </div>
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
          <div>
            <h5 className={"inline-block font-bold"}>ACH Payment Processing</h5>
            <div className={"md:inline-block"}>
              <Tag color={TagColor.WHITE} text={"Feature"} />
              <Tag color={TagColor.BLUE} text={"Coding"} />
            </div>
          </div>
          - In concert with my senior engineers, created an event driven feature
          for allowing clients to make ACH payments
          <br />
          - Based on the NACHA PPD/CCD formatting
          <br />- Payments batched daily, uploaded via SFTP
        </li>
        <li>
          <div>
            <h5 className={"inline-block font-bold"}>HTML to PDF Service</h5>
            <div className={"md:inline-block"}>
              <Tag color={TagColor.WHITE} text={"Service"} />
              <Tag color={TagColor.ORANGE} text={"API"} />
              <Tag color={TagColor.BLUE} text={"Coding"} />
            </div>
          </div>
          - Created a microservice to serve requests to convert HTML to PDF
          <br />
          - Went through numerous libs, including html2pdf, pdftk, ghostscript,
          etc, until settling on a paid product (PrinceXML)
          <br />
          - Pdftk & ghostscript still used for metadata extraction & merging
          <br />- Serves about 20,000 documents per month
        </li>
        <li>
          <div>
            <h5 className={"inline-block font-bold"}>Migration to React</h5>
            <div className={"md:inline-block"}>
              <Tag color={TagColor.WHITE} text={"Backend"} />
              <Tag color={TagColor.GREEN} text={"Frontend"} />
              <Tag color={TagColor.BLUE} text={"Coding"} />
            </div>
          </div>
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
          <div>
            <h5 className={"inline-block font-bold"}>SOAP API</h5>
            <div className={"md:inline-block"}>
              <Tag color={TagColor.WHITE} text={"Service"} />
              <Tag color={TagColor.ORANGE} text={"API"} />
              <Tag color={TagColor.BLUE} text={"Coding"} />
            </div>
          </div>
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
