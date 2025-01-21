import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticleHome from "./articles/Home";
import ArticlePayAtClose from "./articles/PayAtClose";
import ArticleCloudInspect from "./articles/CloudInspect";
import ArticleSecureParamFetch from "./articles/SecureParamFetch";
import ArticleFileFetchService from "./articles/FileFetchService";
import ArticleBatchPhotoDownload from "./articles/BatchPhotoDownload";
import { payAtCloseMeta } from "./projects/PayAtClose";
import { cloudInspectMeta } from "./projects/CloudInspect";
import { secureParamFetchMeta } from "./projects/SecureParamFetch";
import { fileFetchServiceMeta } from "./projects/FileFetchService";
import { batchPhotoDownloadMeta } from "./projects/BatchPhotoDownload";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path={`/${payAtCloseMeta.name}`} element={<ArticlePayAtClose />} />
          <Route path={`/${cloudInspectMeta.name}`} element={<ArticleCloudInspect />} />
          <Route path={`/${secureParamFetchMeta.name}`} element={<ArticleSecureParamFetch />} />
          <Route path={`/${fileFetchServiceMeta.name}`} element={<ArticleFileFetchService />} />
          <Route path={`/${batchPhotoDownloadMeta.name}`} element={<ArticleBatchPhotoDownload />} />
          <Route path={"/"} element={<ArticleHome />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
