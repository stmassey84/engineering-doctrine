import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticleHome from "./articles/Home";
import ArticlePayAtClose from "./articles/PayAtClose";
import { payAtCloseMeta } from "./studies/PayAtClose";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path={`/${payAtCloseMeta.name}`}
            element={<ArticlePayAtClose />}
          />
          <Route path={"/"} element={<ArticleHome />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
