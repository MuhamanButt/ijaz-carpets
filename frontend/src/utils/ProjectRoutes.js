import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import AllProducts from "../pages/AllProducts";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";

const ProjectRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rugs/modern" element={<AllProducts type ="modern"/>} />
        <Route path="/rugs/vintage" element={<AllProducts type ="vintage"/>} />
        <Route path="/rugs/versace" element={<AllProducts type ="versace"/>} />
        <Route path="/rugs/runners" element={<AllProducts type ="runners"/>} />
        <Route path="/wall-hangings" element={<AllProducts type ="wall-hangings"/>} />
        <Route path="/door-mats" element={<AllProducts type ="door-mats"/>} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/rugs/:type/:productID" element={<ProductPage />} />
        <Route path="/:type/:productID" element={<ProductPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default ProjectRoutes;
