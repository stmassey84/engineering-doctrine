import Introduction, { introductionMeta } from "./Introduction";
import AboutMe, { aboutMeMeta } from "./AboutMe";
import Leadership, { leadershipMeta } from "./Leadership";
import ApplicationSystemDesign, { applicationSystemDesignMeta } from "./ApplicationSystemDesign";
import DeeperThoughts, { deeperThoughtsMeta } from "./DeeperThoughts";
import CaseStudies, { caseStudiesMeta } from "./CaseStudies";

const sections = [
  Introduction,
  AboutMe,
  Leadership,
  ApplicationSystemDesign,
  DeeperThoughts,
  CaseStudies
];

export const sectionsMetaData = {
  introductionMeta,
  aboutMeMeta,
  leadershipMeta,
  applicationSystemDesignMeta,
  deeperThoughtsMeta,
  caseStudiesMeta
};

export default sections;
