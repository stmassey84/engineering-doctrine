import React from "react";
import Container from "../components/Container";
import Article from "../components/Article";
import CloudInspect, { cloudInspectMeta } from "../studies/CloudInspect";

const articleMeta = {
  title: `Case Study: ${cloudInspectMeta.title}`,
  author: "Steve Massey",
  date: "December, 2022"
};

const ArticleCloudInspect: React.FC = () => {
  return (
    <Container>
      <Article {...articleMeta}>
        <CloudInspect />
      </Article>
    </Container>
  );
};

export default ArticleCloudInspect;
