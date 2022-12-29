import React from "react";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import Title from "./Title";
import { SectionMeta } from "./types";

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
    </div>
  );
};

export default CaseStudies;
