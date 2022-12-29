import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import Title from "./Title";
import { SectionMeta } from "./types";
import { studiesMetaData } from "../studies";

export const caseStudiesMeta: SectionMeta = {
  title: "Case Studies",
  name: "case-studies",
  path: "/",
};

const CaseStudies: React.FC = () => {
  const {toggleSectionInView} = useApp();
  const {ref, inView} = useInView();

  React.useEffect(() => {
      toggleSectionInView(caseStudiesMeta.name, inView);
  }, [toggleSectionInView, inView]);

  return (
    <div id={caseStudiesMeta.name} ref={ref}>
      <Title title={caseStudiesMeta.title} />
      <ol>
      {Object.values(studiesMetaData).map(study => (
        <li key={study.name}>
          <Link to={study.path}>{study.title}</Link>
        </li>
      ))}
      </ol>
    </div>
  );
};

export default CaseStudies;
