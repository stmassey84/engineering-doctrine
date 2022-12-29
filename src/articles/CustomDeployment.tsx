import React from "react";
import Container from "../components/Container";
import Article from "../components/Article";
import CustomDeployment, { customDeploymentMeta } from "../studies/CustomDeployment";

const articleMeta = {
  title: `Case Study: ${customDeploymentMeta.title}`,
  author: "Steve Massey",
  date: "December, 2022"
};

const ArticleCustomDeployment: React.FC = () => {
  return (
    <Container>
      <Article {...articleMeta}>
        <CustomDeployment />
      </Article>
    </Container>
  );
};

export default ArticleCustomDeployment;
