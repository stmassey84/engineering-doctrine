import React from "react";
import Container from "../components/Container";
import Article from "../components/Article";
import PayAtClose, { payAtCloseMeta } from "../studies/PayAtClose";

const articleMeta = {
  title: `Case Study: ${payAtCloseMeta.title}`,
  author: "Steve Massey",
  date: "December, 2022"
};

const ArticlePayAtClose: React.FC = () => {
  return (
    <Container>
      <Article {...articleMeta}>
        <PayAtClose />
      </Article>
    </Container>
  );
};

export default ArticlePayAtClose;
