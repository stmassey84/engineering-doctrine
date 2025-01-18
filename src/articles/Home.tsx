import React from "react";
import { useLocation } from "react-router-dom";
import Container from "../components/Container";
import Article from "../components/Article";
import sections from "../sections";

const articleMeta = {
  title: "Engineering Doctrine",
  author: "Steve Massey",
  date: "Spring, 2024",
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
        {sections.map((Section, index) => (
          <Section key={index} />
        ))}
      </Article>
    </Container>
  );
};

export default ArticleHome;
