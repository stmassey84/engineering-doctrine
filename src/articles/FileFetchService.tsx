import React from "react";
import Container from "../components/Container";
import Article from "../components/Article";
import FileFetchService, { fileFetchServiceMeta } from "../projects/FileFetchService";

const articleMeta = {
  title: fileFetchServiceMeta.title,
  author: "Steve Massey",
  date: "December, 2022",
};

const ArticleFileFetchService: React.FC = () => {
  return (
    <Container>
      <Article {...articleMeta}>
        <FileFetchService />
      </Article>
    </Container>
  );
};

export default ArticleFileFetchService;
