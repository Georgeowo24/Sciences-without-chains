import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import BlogPage from "@/pages/blog";
import LoginPage from "./pages/login";
import AboutPage from "./pages/about";
import CategoriesPage from "@/pages/categories";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CategoriesPage />} path="/categories" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<LoginPage/>}  path="/login"/>
    </Routes>
  );
}

export default App;
