import React from "react";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import Title from "./Title";
import { SectionMeta } from "./types";

export const leadershipMeta: SectionMeta = {
  title: "Leadership",
  name: "leadership",
  path: "/",
};

const Leadership: React.FC = () => {
  const {toggleSectionInView} = useApp();
  const {ref, inView} = useInView();

  React.useEffect(() => {
      toggleSectionInView(leadershipMeta.name, inView);
  }, [toggleSectionInView, inView]);

  return (
    <div id={leadershipMeta.name} ref={ref}>
      <Title title={leadershipMeta.title} />
      <p>
        When I think of leadership, I think of confident people; unburdened in
        their ability to voice concerns, provide critical feedback, make
        decisions that can have uncomfortable results, and more. Leaders are not
        perfect, regardless of how confident they appear - good leaders endeavor
        to know their faults/weaknesses, and they strive to improve/mitigate
        them.
      </p>
      <p>
        Being a leader is more than gaining rank. There is respect involved: for
        your team, peers, seniors, customers, and most importantly, for
        yourself. Navigating the chaos of the professional world is far easier
        when you have a working rapport with your people. I believe this is
        achieved through the establishment of respect, through clear
        communication for expectation & goal setting.
      </p>
      <p>
        Some of the values that I aspire to fulfill in an effort to make me a
        better leader:
      </p>
      <h4>Adaptation</h4>
      <ul>
        <li>
          The way things operated of a previous place of work may not be
          completely compatible with a new one
        </li>
        <li>
          A healthy dose of humility, coupled with ambition, can help one learn
          the lay of the land
        </li>
        <li>
          Having these values can help forge new relationships, lines of
          communication, and informational channels. These are essential to
          forging a successful path.
        </li>
      </ul>
      <h4>Challenging Others & Being Challenged</h4>
      <ul>
        <li>There is little innovation without challenge</li>
        <li>
          Challenging those working with you and/or under you can spark
          creativity
        </li>
        <li>
          Similarly, being challenged by those you work with/for can do the
          same, or at the very least prevent stagnation
        </li>
      </ul>
      <h4>Emotional Intelligence</h4>
      <ul>
        <li>
          Having compassion to understand and possibly empathize with your team
        </li>
        <li>
          Knowing the work styles' of others and respecting them
        </li>
        <li>Gaining mutual trust with your most dependable contributors</li>
      </ul>
      <h4>Mentorship</h4>
      <ul>
        <li>
          Helping contributors, regardless of their relative position in the
          company, is one of the most fulfilling experiences as a leader
        </li>
        <li>
          Enhancing the contributor's value through guidance adds value to the
          business
        </li>
        <li>Taking a collaborative approach encourages growth</li>
      </ul>
    </div>
  );
};

export default Leadership;