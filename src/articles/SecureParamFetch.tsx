import React from "react";
import Container from "../components/Container";
import Article from "../components/Article";
import SecureParamFetch, { secureParamFetchMeta } from "../projects/SecureParamFetch";

const articleMeta = {
  title: secureParamFetchMeta.title,
  author: "Steve Massey",
  date: "December, 2022",
};

const ArticleSecureParamFetch: React.FC = () => {
  return (
    <Container>
      <Article {...articleMeta}>
        <SecureParamFetch />
      </Article>
    </Container>
  );
};

export default ArticleSecureParamFetch;
