import React from "react";
import { useInView } from "react-intersection-observer";
import { useApp } from "../context";
import Title from "./Title";
import { SectionMeta } from "./types";

export const deeperThoughtsMeta: SectionMeta = {
  title: "Deeper Thoughts & Ideals",
  name: "deeper-throughts-ideals",
  path: "/",
};

const DeeperThoughts: React.FC = () => {
  const { toggleSectionInView } = useApp();
  const { ref, inView } = useInView({ threshold: 0.2 });

  React.useEffect(() => {
    toggleSectionInView(deeperThoughtsMeta.name, inView);
  }, [toggleSectionInView, inView]);

  return (
    <div id={deeperThoughtsMeta.name} ref={ref}>
      <Title title={deeperThoughtsMeta.title} />
      <p>
        There are more considerations when going further into system and
        application design. Through experience and academia, I have found it
        helpful to lean into the following:
      </p>
      <h4>Cost Opportunity & Shortcuts</h4>
      <ul>
        <li>
          Wondering if your team chose the “right” server, platform, languages,
          frameworks, libraries or paradigms is natural, but allowing it to
          affect scope after things are in motion is often harmful
        </li>
        <li>
          When ideating on design decisions, instead of wondering about the
          right choice, it is better to gain perspective: What is the scale?
          Should we care about a 5 ms reduction in response time? Does a 2-3
          second delay in build time due to an extra step in transpilation
          matter?
        </li>
        <li>
          Consider the pros and cons of cutting corners to shorten time to
          market or an MVP. Ultimately it can be a case-by-case decision by
          engineers, product, and leadership.
        </li>
      </ul>
      <h4>Reduce Complexity</h4>
      <ul>
        <li>
          It is ideal to use the minimum number of systems to achieve a goal
        </li>
        <li>
          For each sub-component of a system, limit the potential failure &
          bottleneck points by only using services which are essential
        </li>
      </ul>
      <h4>
        Exception Handling: Asking the “What Ifs” and knowing when to move on
      </h4>
      <ul>
        <li>
          It is important to ponder on exceptions, but remember there is a goal
          of creating a production ready environment. Thinking of & adding
          handing for the .002% edge cases has virtually no ROI.
        </li>
        <li>
          Make exception handling consistent. Use a global handler and pass as
          much through to it as possible. Middleware/plugins can often help with
          this.
        </li>
        <li>
          When dealing with APIs, make good use of HTTP codes to communicate the
          nature of the issue
        </li>
      </ul>
      <h4>Concurrency</h4>
      <ul>
        <li>
          If a request triggers a body of work to break a set of data down or
          bring segmented sets together, one should consider splitting the work.
          Similar to how we can divide web requests between web servers, we can
          also split for processing bodies of work.
        </li>
      </ul>
      <h4>Disk & Network Use</h4>
      <ul>
        <li>
          Disks can be a bottleneck, depending on implementation; Network is an
          even bigger bottleneck.
        </li>
        <li>
          Reading a small group of files from the disk, then having them loaded
          into RAM via the runtime (e.g. node binary), is ideal when possible.
          Most infrastructure-as-code will blackbox this, but it's a good idea
          to remember that smaller is better, especially when dealing with a
          large number of high-request-volume serving instances.
        </li>
        <li>
          Avoid having large data files stored in a project’s repository and/or
          deployment package. A copy of this might be delivered to each
          instance, adding to the overall latency.
        </li>
      </ul>
      <h4>Eventually Consistent vs Strongly Consistent</h4>
      <ul>
        <li>Consider the needs of the application</li>
        <li>
          Strong consistency may be required, especially for applications that
          perform tasks like payment processing or serve multi-user
          collaborative features. But it typically comes with a cost, a higher
          latency and monetary one.
        </li>
        <li>
          Weaker or eventually consistent systems are more performant and can
          cost less money, but you lose the guarantee that your replicas will
          have the latest copy of data within X time
        </li>
      </ul>
      <h4>CI/CD</h4>
      <ul>
        <li>
          It is best to rely on a standardized toolkit (i.e. Jest/Mocha with a
          trigger mechanism such as GH)
        </li>
        <li>
          But there may be projects that contain only some, or perhaps zero, of
          the tools implementing CI/CD. A common example of this will be legacy
          or rapidly developed projects.
        </li>
        <li>
          How are the common pitfalls of build + deploy handled in projects
          without CI/CD, and is it worth retrofitting them?
        </li>
      </ul>
      <h4>Thinking about the right tool for the right job</h4>
      <ul>
        <li>
          Some thought should be spent to weight the pros/cons of any one
          service or tool
        </li>
        <li>
          Similar to not planning for the .002% edge cases, there are major
          factors that can help determine whether it's the right pick:
          <ul>
            <li>
              When designing a high volume application which has a need to
              perform millions of read/write ops per minute, you need a
              performant data store
            </li>
            <li>Would an SQL RDBMS solution suffice?</li>
            <li>
              Perhaps a NoSQL solution would be better for this particular need?
            </li>
            <li>
              Does adding a caching layer in front of the database seem helpful
              and cost effective?
            </li>
            <li>
              Regardless of choice, plan for the common pitfalls of the selected
              tool
            </li>
          </ul>
        </li>
      </ul>
      <h4>Frontend Concerns</h4>
      <ul>
        <li>
          A well designed UI/UX is essential to making good use of server-side
          resources
        </li>
        <li>
          For example, error feedback is important, as-is controlling user
          input. If a button triggers an AJAX request to your backend, which
          requires the user to wait some period of time, the UX should not allow
          that user to trigger that same request until the first one is
          complete. An exception to this might be a search input, where we are
          debounced -and- we have the option to cancel a currently running
          request in favor of a new one.
          <ul>
            <li>
              With rapid requests, such as a search input, the round trip time
              should be minimized
            </li>
            <li>Leverage caching in your data modeling to reduce time</li>
            <li>
              Think about the cold (container, instance, etc) instantiation as a
              potential bottleneck when fulfilling a rapid request. Is it a
              factor in the design?
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default DeeperThoughts;
