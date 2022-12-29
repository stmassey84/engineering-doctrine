import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { sectionsMetaData } from "../sections";
import { studiesMetaData } from "../studies";
import { SectionMeta } from "../sections/types";
import { StudyMeta } from "../studies/types";
import { useApp } from "../context";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";
import { SocialIcon, SocialIconProps } from "react-social-icons";

type TNavigation = (SectionMeta | StudyMeta) & {
  href: string;
  section?: boolean;
};

export const sectionsNavigationDefault: TNavigation[] = [
  {
    ...sectionsMetaData.introductionMeta,
    href: `#${sectionsMetaData.introductionMeta.name}`,
    section: true,
  },
  {
    ...sectionsMetaData.aboutMeMeta,
    href: `#${sectionsMetaData.aboutMeMeta.name}`,
    section: true,
  },
  {
    ...sectionsMetaData.leadershipMeta,
    href: `#${sectionsMetaData.leadershipMeta.name}`,
    section: true,
  },
  {
    ...sectionsMetaData.applicationSystemDesignMeta,
    href: `#${sectionsMetaData.applicationSystemDesignMeta.name}`,
    section: true,
  },
  {
    ...sectionsMetaData.deeperThoughtsMeta,
    href: `#${sectionsMetaData.deeperThoughtsMeta.name}`,
    section: true,
  },
  {
    ...sectionsMetaData.caseStudiesMeta,
    href: `#${sectionsMetaData.caseStudiesMeta.name}`,
    section: true,
  },
];

export const caseStudiesNavigationDefault: TNavigation[] = [
  {
    ...studiesMetaData.payAtCloseMeta,
    href: `#${studiesMetaData.payAtCloseMeta.name}`,
  },
  {
    ...studiesMetaData.cloudInspectMeta,
    href: `#${studiesMetaData.cloudInspectMeta.name}`,
  },
  {
    ...studiesMetaData.secureParamFetchMeta,
    href: `#${studiesMetaData.secureParamFetchMeta.name}`,
  },
  {
    ...studiesMetaData.fileFetchServiceMeta,
    href: `#${studiesMetaData.fileFetchServiceMeta.name}`,
  },
  {
    ...studiesMetaData.batchPhotoDownloadMeta,
    href: `#${studiesMetaData.batchPhotoDownloadMeta.name}`,
  },
  {
    ...studiesMetaData.customDeploymentMeta,
    href: `#${studiesMetaData.customDeploymentMeta.name}`,
  },
];

const SocialIconExt = (props: SocialIconProps): JSX.Element => {
  // merge the class names
  const { className, ...rest } = props;
  const classes = classNames("w-8 h-8", className);

  return (
    <SocialIcon
      target={"_blank"}
      rel={"noreferrer"}
      className={classes}
      {...rest}
    />
  );
};

const Navigation: React.FC = () => {
  const location = useLocation();
  const { sectionsInView } = useApp();
  const [sectionInView, setSectionInView] = React.useState<string>("");
  const [pathNameInView, setPathNameInView] = React.useState<string>("");
  const [hashInView, setHashInView] = React.useState<string>("");
  const [mobileSideNavScreenOn, setMobileSideNavScreenOn] = React.useState<
    boolean | null
  >(null);

  React.useEffect(() => {
    const inView = sectionsInView.find((section) => section.inView);
    if (inView !== undefined) {
      setSectionInView(inView.name);
      setHashInView("");
      setPathNameInView("");
    } else {
      setSectionInView("");
    }
  }, [sectionsInView, setSectionInView]);

  React.useEffect(() => {
    setPathNameInView(location.pathname);
    setHashInView(location.hash);
    setSectionInView("");
  }, [location.pathname, location.hash]);

  React.useEffect(() => {
    const reset = () => setMobileSideNavScreenOn(null);
    (window as Window).addEventListener("resize", reset);
    return () => {
      (window as Window).removeEventListener("resize", reset);
    };
  }, []);

  return (
    <aside
      className={classNames(
        "app-side-nav fixed w-64 pt-8 pb-16 lg:pt-16 lg:pb-24",
        typeof mobileSideNavScreenOn === "boolean"
          ? mobileSideNavScreenOn
            ? "on-screen"
            : "off-screen"
          : ""
      )}
      aria-label={"Sidebar"}
    >
      <div
        className={
          "grid grid-flow-col auto-cols-ma items-center bg-gray-50 mb-2"
        }
      >
        <div>
          <div className={"overflow-y-auto py-4 px-3 rounded"}>
            {/* <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">*/}
            <ul className={"space-y-2"}>
              {sectionsNavigationDefault.map((section) => (
                <li key={section.name}>
                  <HashLink
                    to={`${section.path}#${section.name}`}
                    className={classNames(
                      "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
                      (pathNameInView === section.path &&
                        hashInView !== "" &&
                        hashInView === section.href) ||
                        sectionInView === section.name
                        ? "bg-gray-100"
                        : ""
                    )}
                  >
                    {section.title}
                  </HashLink>
                </li>
              ))}
              {caseStudiesNavigationDefault.map((caseStudy) => (
                <li key={caseStudy.name}>
                  <Link
                    to={`/${caseStudy.name}`}
                    className={classNames(
                      "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
                      location.pathname === caseStudy.path ? "bg-gray-100" : ""
                    )}
                  >
                    {caseStudy.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={"pt-4 mt-4 space-y-2 border-t border-gray-200"}>
              <div className={"text-center"}>
                <SocialIconExt
                  url={"https://linkedin.com/in/stevepmassey"}
                  title={"View my LinkedIn"}
                />
                <SocialIconExt
                  url={"https://github.com/stmassey84/engineering-doctrine"}
                  className={"ml-1"}
                  title={"View the Source Code"}
                />
                <SocialIconExt
                  url={"mailto:steve@stevemassey.net"}
                  className={"ml-1"}
                  title={"Email me"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="visible max-h-full sm:hidden">
          {!mobileSideNavScreenOn && (
            <ChevronDoubleRightIcon
              style={{ width: "32px" }}
              onClick={() => setMobileSideNavScreenOn(true)}
            />
          )}
          {mobileSideNavScreenOn && (
            <ChevronDoubleLeftIcon
              style={{ width: "32px" }}
              onClick={() => setMobileSideNavScreenOn(false)}
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Navigation;
