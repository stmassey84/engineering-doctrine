import React from "react";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import Title from "./Title";
import { SectionMeta } from "./types";

export const introductionMeta: SectionMeta = {
  title: "Introduction",
  name: "introduction",
  path: "/",
};

const Introduction: React.FC = () => {
  const {toggleSectionInView} = useApp();
  const {ref, inView} = useInView({threshold: .9});

  React.useEffect(() => {
      toggleSectionInView(introductionMeta.name, inView);
  }, [toggleSectionInView, inView]);

  return (
    <div id={introductionMeta.name} ref={ref}>
      <Title title={introductionMeta.title} />
      <p>
        Building computers from a young age has always made me interested in
        software. My father worked at NASA Wallops Flight Facility where he
        would engineer ground control equipment for satellite telemetry. He
        would bring spare parts home and before long our first computer was
        built with an i486 series processor.
      </p>
      <p>
        I would go on to build numerous computers in those early days and
        through my teen years. During this time, I gained a lifelong
        appreciation for composition. Having the possibility of arranging
        components in the same generation of architecture gave me freedom to
        upgrade, downgrade, and replace the various pieces. This was a
        fulfilling experience and is the basis for my love of software
        engineering.
      </p>
      <p>
        That passion for composition strongly influences my decision making, and
        thus I believe the ability to bring structure to something that doesn't
        exist, or exists but is in need of re-envisionment, is at the core of my
        engineering philosophy. In my opinion, one of the best places to see
        this put into practice is in the high level design of isolated and/or
        distributed systems.
      </p>
      <p>
        Over my career, I have designed dozens of applications and dozens more
        micro-services. Eventually, I reached a point of seniority where my
        counsel was helpful in leadership capacity.
      </p>
    </div>
  );
};

export default Introduction;
