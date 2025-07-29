import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/login";
import AboutPage from "./pages/about";
import CategoriesPage from "@/pages/categories";
import DocsPage from "./pages/docs";
import SignUpPage from "./pages/signUp";
import UploadDocsPage from "./pages/uploadDocs";
import HelpPage from "./pages/help";


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CategoriesPage />} path="/categories" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<LoginPage/>}  path="/login"/>
      <Route element={<DocsPage/>}  path="/docs"/>
      <Route element={<SignUpPage/>}  path="/signUp"/>
      <Route element={<UploadDocsPage/>}  path="/uploadDocs"/>
      <Route element={<HelpPage/>}  path="/help"/>
    </Routes>
  );
}

export default App;
