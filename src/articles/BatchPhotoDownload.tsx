import React from "react";
import Container from "../components/Container";
import Article from "../components/Article";
import BatchPhotoDownload, { batchPhotoDownloadMeta } from "../studies/BatchPhotoDownload";

const articleMeta = {
  title: `Case Study: ${batchPhotoDownloadMeta.title}`,
  author: "Steve Massey",
  date: "December, 2022"
};

const ArticleBatchPhotoDownload: React.FC = () => {
  return (
    <Container>
      <Article {...articleMeta}>
        <BatchPhotoDownload />
      </Article>
    </Container>
  );
};

export default ArticleBatchPhotoDownload;
