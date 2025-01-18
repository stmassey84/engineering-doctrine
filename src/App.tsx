import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticleHome from "./articles/Home";
import ArticlePayAtClose from "./articles/PayAtClose";
import ArticleCloudInspect from "./articles/CloudInspect";
import ArticleSecureParamFetch from "./articles/SecureParamFetch";
import ArticleFileFetchService from "./articles/FileFetchService";
import ArticleBatchPhotoDownload from "./articles/BatchPhotoDownload";
import ArticleCustomDeployment from "./articles/CustomDeployment";
import { payAtCloseMeta } from "./studies/PayAtClose";
import { cloudInspectMeta } from "./studies/CloudInspect";
import { secureParamFetchMeta } from "./studies/SecureParamFetch";
import { fileFetchServiceMeta } from "./studies/FileFetchService";
import { batchPhotoDownloadMeta } from "./studies/BatchPhotoDownload";
import { customDeploymentMeta } from "./studies/CustomDeployment";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path={`/${payAtCloseMeta.name}`}
            element={<ArticlePayAtClose />}
          />
          <Route
            path={`/${cloudInspectMeta.name}`}
            element={<ArticleCloudInspect />}
          />
          <Route
            path={`/${secureParamFetchMeta.name}`}
            element={<ArticleSecureParamFetch />}
          />
          <Route
            path={`/${fileFetchServiceMeta.name}`}
            element={<ArticleFileFetchService />}
          />
          <Route
            path={`/${batchPhotoDownloadMeta.name}`}
            element={<ArticleBatchPhotoDownload />}
          />
          <Route
            path={`/${customDeploymentMeta.name}`}
            element={<ArticleCustomDeployment />}
          />
          <Route path={"/"} element={<ArticleHome />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
