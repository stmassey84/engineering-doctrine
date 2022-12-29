import React from "react";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import Title from "./Title";
import { SectionMeta } from "./types";

export const applicationSystemDesignMeta: SectionMeta = {
  title: "Application & System Design",
  name: "application-system-design",
  path: "/",
};

const ApplicationSystemDesign: React.FC = () => {
  const {toggleSectionInView} = useApp();
  const {ref, inView} = useInView();

  React.useEffect(() => {
      toggleSectionInView(applicationSystemDesignMeta.name, inView);
  }, [toggleSectionInView, inView]);

  return (
    <div id={applicationSystemDesignMeta.name} ref={ref}>
      <Title title={applicationSystemDesignMeta.title} />
      <p>
        As mentioned in the introduction, I tend to view the architecture of a
        system in the lens of composition. But before I can begin moving the
        pieces into place, I prefer to understand the business need and the
        value prop to the end-user. It is also extremely helpful to have vision
        into the industry and the company's overall product offering.
      </p>
      <p>
        With that information, I will create documentation detailing my thinking
        on design and the factors going into it. Some of these factors include:
      </p>
      <h4>Avoiding the Money Pit</h4>
      <ul>
        <li>
          Modern plug 'n play cloud infrastructure makes it very easy to run up
          a huge bill
        </li>
        <li>
          It is best to estimate pricing based on anticipated volume in the near and long term
        </li>
        <li>
          It's not that it is best to go with the cheapest services, but rather
          that for the requirements, we anticipate it costing X dollars over Y
          time
        </li>
      </ul>
      <h4>Fault Tolerant</h4>
      <ul>
        <li>Failed nodes/instances are replaced automatically</li>
        <li>
          Individual requests cannot self-recover (dead end web requests), but
          the instance behind it might be able to via replacement. A well
          designed UX/UI or an automated try-again algorithm on the calling side
          can increase the chances of a dead request being tried again.
        </li>
        <li>
          Reasons for faults are propagated to the appropriate logging & alert
          tool
        </li>
      </ul>
      <h4>Consistency</h4>
      <ul>
        <li>Documentation is kept up to date</li>
        <li>
          Calling "POST &#123; "my": "data" &#125;" results in the same behavior
          no matter which instance handles my request
        </li>
      </ul>
      <h4>Highly Available</h4>
      <ul>
        <li>
          Leverage load balancing to distribute the requests in some fair
          pattern
        </li>
        <li>Consider cold starts vs warm instances and the performance associated with both</li>
        <li>
          Distribute across the network, geographically, via the cloud provider
          whenever possible
        </li>
      </ul>
      <h4>Scalable</h4>
      <ul>
        <li>
          Framework in place to boot up new instances/containers to complement
          the already running
        </li>
        <li>
          There are multiple auto scaling toolkits that can streamline, but
          choosing one is dependent on the overall need of the application
          (i.e.instance vs VM vs container)
        </li>
      </ul>
      <h4>Performant</h4>
      <ul>
        <li>
          Accept that scaling doesn't eliminate all bottlenecks, and there will
          always be areas of contraction that cause latency
        </li>
        <li>
          Find where traffic is most likely to get hung up, then apply methods
          of expansion and/or queueing
        </li>
        <li>
          Deploy caching solutions when throughput finds a bottleneck in its
          data needs
        </li>
      </ul>
      <h4>Secure</h4>
      <ul>
        <li>
          If at all possible, restrict access outside of normal traffic to only
          the local network. VPN solutions should be implemented.
        </li>
        <li>
          Lock down instances using firewall/access groups/policies as to only
          allow traffic on specific ports
        </li>
        <li>
          Inject sensitive information, such as passwords & keys, into the
          environment from secure containers
        </li>
      </ul>
    </div>
  );
};

export default ApplicationSystemDesign;
