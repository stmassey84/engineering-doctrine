import React from "react";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import Title from "./Title";
import { SectionMeta } from "./types";

export const aboutMeMeta: SectionMeta = {
  title: "About Me",
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
      <Title title={aboutMeMeta.title} />
      <p>
        I really like lists because they read like objectives & factoids to me,
        so here's a quick list about me & my professional experience/views:
      </p>
      <ul>
        <li>
          I love technology in general, but I don't spend all my free time on
          it. When I do spend time on it, it is often to look into new
          languages, frameworks, and libraries.
        </li>
        <li>
          Some of that same free time is used for games. I've been a gamer since
          1993 when I played Doom/Wolfenstein on my i486.
        </li>
        <li>
          I'm big into documentation, which helps my natural inclination of
          being process oriented. Seeing well covered articles in Confluence &
          Google Drive brings me satisfaction.
        </li>
        <li>
          Preparation is a huge deal to me. I like to take time for discovery,
          ideation, & postulation.
        </li>
        <li>
          I work well under pressure. Working for a startup for 10 years, then
          in a larger company for 4, has granted me that grace under fire. This
          doesn't mean I prefer to work under pressure!
        </li>
        <li>
          The opinions of others are paramount to me, especially those
          I work with on a regular basis. I want your ideas, your criticisms,
          your feedback. Tell me you hate the weather and I'll ask why, because
          maybe I love that same type of weather.
        </li>
        <li>
          I am big on customer centricity - as a junior engineer, I had to
          answer support calls & emails while watching our logs and actively
          developing. There were errors I found and fixed before the customer
          even called. This 1:1 time with customers gave me an overall high
          respect for them. They are the lifeblood.
        </li>
        <li>
          Work-life balance is important to me, but that doesn't meen I won't
          show up to make sure we reach the finish line on a product launch
        </li>
        <li>
          Many businesses have a values-list and there's usually a story behind
          each one. One of them at Porch Group is “No Jerks, No Egos.” This is
          one I absolutely strive to embody.
        </li>
      </ul>
    </div>
  );
};

export default AboutMe;
