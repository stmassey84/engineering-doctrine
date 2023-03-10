import React from "react";
import { useLocation } from "react-router-dom";
import Container from "../components/Container";
import Article from "../components/Article";
import sections from "../sections";

const articleMeta = {
  title: "Engineering Doctrine",
  author: "Steve Massey",
  date: "December, 2022",
};

const ArticleHome: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (!location.hash) {
      setTimeout(() => window.scrollTo(0, 0), 0);
    }
  }, [location]);

  return (
    <Container>
      <Article {...articleMeta}>
        <p className={"lead"}>
          The intention of this
          document is to illustrate my thoughts on software engineering and to
          display some of the projects I have worked on. If you have any
          questions please do not hesitate to contact me using the social links
          found on the left side of the page.<br/><br/>
          This site & the documents within will be added to over time. The opinions expressed within are my own.
        </p>
        {sections.map((Section, index) => (
          <Section key={index} />
        ))}
      </Article>
    </Container>
  );
};

export default ArticleHome;
