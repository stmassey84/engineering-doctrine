import React from "react";
import Container from "../components/Container";
import Article from "../components/Article";
import BatchPhotoDownload, { batchPhotoDownloadMeta } from "../projects/BatchPhotoDownload";

const articleMeta = {
  title: batchPhotoDownloadMeta.title,
  author: "Steve Massey",
  date: "December, 2022",
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
