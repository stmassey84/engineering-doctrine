import React from "react";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import { SectionMeta } from "./types";

export const aboutMeMeta: SectionMeta = {
  title: "Introduction",
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
        Hello! You've made it to my portfolio site which might mean you are interested in learning more about me, and I
        really appreciate that! Let me start by introducing myself - my name is <strong>Steve Massey</strong>, and I'm a
        <strong>Software Engineer with 20 years of experience</strong> building all kinds of on-prem, cloud, and
        distributed systems.
      </p>
      <p>
        I'm also a capable engineering leader, able to act as CTO/Senior Manager, bringing value to businesses through
        orchestration, people management, and technical direction.
      </p>
      <p>
        Please explore the content here, and if curious, you can see how the site was built by visiting the{" "}
        <a href="https://github.com/stmassey84/engineering-doctrine" target="_blank" rel="noreferrer">
          source code here
        </a>
        .
      </p>
    </div>
  );
};

export default AboutMe;
