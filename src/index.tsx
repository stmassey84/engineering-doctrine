import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import BlogPost from "./pages/BlogPost";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout hideNav={true} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/post/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
