import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import AllProducts from "../pages/AllProducts";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/CheckoutPage";
import Admin from "../pages/Admin";
import { useSelector } from "react-redux";
import OrderPreview from "../pages/OrderPreview";
import ContactUs from "../pages/ContactUs";
import ProductsBySize from "../pages/ProductsBySize";
const ProjectRoutes = () => {
    const { isLoggedIn } = useSelector((state) => state.adminToken);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={ <Admin /> } />
        <Route path="/contact-us" element={ <ContactUs /> } />
        <Route path="/view-order" element={ <OrderPreview /> } />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/:size" element={<AllProducts type="size" />} />
        <Route path="/rugs" element={<AllProducts type ="rugs"/>} />
        <Route path="/door-mats" element={<AllProducts type ="door-mats"/>} />
        <Route path="/rugs/modern" element={<AllProducts type ="modern"/>} />
        <Route path="/rugs/woven" element={<AllProducts type ="woven"/>} />
        <Route path="/rugs/non-woven" element={<AllProducts type ="non-woven"/>} />
        <Route path="/rugs/persian" element={<AllProducts type ="persian"/>} />
        <Route path="/rugs/runners" element={<AllProducts type ="runners"/>} />
        <Route path="/wall-hangings" element={<AllProducts type ="wall-hangings"/>} />
        <Route path="/:type/:productID" element={<ProductPage />} />
        <Route path="/rugs/:type/:productID" element={<ProductPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default ProjectRoutes;
