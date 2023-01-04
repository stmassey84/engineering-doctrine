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
  const { toggleSectionInView } = useApp();
  const { ref, inView } = useInView();

  React.useEffect(() => {
    toggleSectionInView(leadershipMeta.name, inView);
  }, [toggleSectionInView, inView]);

  return (
    <div id={leadershipMeta.name} ref={ref}>
      <Title title={leadershipMeta.title} />
      <p>
        This is a very important topic to me, as my career continues in this
        direction & I continue to grow as a manager. The point where engineering
        & leadership intersect can be a challenging one to define and embody, as
        many engineering leaders were once individual contributors themselves.
        The tendency to continue coding at the same rate is a tempting one, as
        it is a natural inclination. This typically comes at a cost though: The
        sacrifice of critical operational duties as a manager. Learning to stay
        sharp on code while also performing such important duties is one of the
        core aspects of becoming a great engineering leader.
      </p>
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
          The way previous places of work operated may not be completely
          compatible with a new one.
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
        <li>Knowing the work styles' of others and respecting them</li>
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
      <h4>Project Management</h4>
      <ul>
        <li>Orchestration of the project lifecycle, including:
          <ul>
            <li>Obtaining stakeholder goals</li>
            <li>Negotiating on target deadlines</li>
            <li>Defining the Minimum Viable Product</li>
            <li>Scoping & sizing</li>
            <li>Technical documentation, including text detailing the system(s) proposed and any associated diagrams</li>
            <li>Allocation of resources (budgetary, staffing, infrastructure, repository, etc)</li>
            <li>Creation of work orders (Jira stories)</li>
            <li>Assignment & distribution of said work orders to selected team members</li>
            <li>Seeding the project with infrastructure & initial framework code</li>
            <li>Ensuring proper testing by developers & QA staff</li>
            <li>Regular heartbeat checkins with team (1:1's, standup, introspectives, etc)</li>
            <li>Regular heartbeat checkins with stakeholders (product manager, marketing, sr staff, etc)</li>
            <li>Compliance with appropriate protocols (PCI, HIIPA, SOX, etc)</li>
            <li>...and iteration until either MVP or market-ready product launch</li>
          </ul>
        </li>
      </ul>      
    </div>
  );
};

export default Leadership;
