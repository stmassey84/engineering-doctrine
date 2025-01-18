import React from "react";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import Title from "./Title";
import { SectionMeta } from "./types";

export const aboutMeMeta: SectionMeta = {
  title: "",
  name: "about-me",
  path: "/",
};

const AboutMe: React.FC = () => {
  const { toggleSectionInView } = useApp();
  const { ref, inView } = useInView();

  React.useEffect(() => {
    toggleSectionInView(aboutMeMeta.name, inView);
  }, [toggleSectionInView, inView]);

  return (
    <div id={aboutMeMeta.name} ref={ref}>
      <p>
        Hello! You've made it to my portfolio site which might mean you are
        interested in learning more about me, and I really appreciate that!
        Please explore the content here, and if curious, you can see how the
        site was built by visiting the{" "}
        <a
          href="https://github.com/stmassey84/engineering-doctrine"
          target="_blank"
        >
          source code here
        </a>
        . Please contact me with any questions!
      </p>
    </div>
  );
};

export default AboutMe;
