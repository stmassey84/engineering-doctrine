import React from "react";
import Container from "../components/Container";
import Article from "../components/Article";
import SecureParamFetch, {
  secureParamFetchMeta,
} from "../studies/SecureParamFetch";

const articleMeta = {
  title: `Case Study: ${secureParamFetchMeta.title}`,
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
