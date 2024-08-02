import React from "react";
import { useState } from "react";
import {
  calculateDeliveryDate,
  formatNumber,
  generateBreadcrumbs,
  handleAddToCart,
} from "../utils/Important_functions";
import Navbar from "../components/Navbar";
import BreadCrumb from "../components/BreadCrumb";
import { useLocation } from "react-router-dom";
import { Button, Modal, Rate, InputNumber, message,Carousel } from "antd";
import Quantity from "../less_use/Quantity";

import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from '../redux/Cart.js/Action';
import Footer from "../components/Footer";
import './styles/ProductPage.css'

const ProductPage = () => {
    const [QuantityVal, setQuantityVal] = useState(1);
  const location = useLocation();
  const productDetails = location.state?.productDetails;
  const dispatch = useDispatch()
  const CART_ITEMS = useSelector((state) => state.cart.items);


  const path = window.location.pathname;
  const breadcrumbItems = generateBreadcrumbs(path);
  const lastItem = breadcrumbItems[breadcrumbItems.length - 1]; // last item to show in title

const getComponent = ()=>{
    return (
        <div className="row m-0 justify-content-center mb-5">
            <div className="col-12 p-0">
                <Carousel arrows draggable fade >
                    <div><img src={productDetails.images_url[0]} alt="" className="product-modal-image" /></div>
                    <div><img src={productDetails.images_url[1]} alt="" className="product-modal-image" /></div>
                    <div><img src={productDetails.images_url[2]} alt="" className="product-modal-image" /></div>
                    <div><img src={productDetails.images_url[3]} alt="" className="product-modal-image" /></div>
                </Carousel>
        </div>
            <div className="col-4 p-1"><img src={productDetails.images_url[1]} className="product-page-secondary-imgs"/></div>
            <div className="col-4 p-1"><img src={productDetails.images_url[2]} className="product-page-secondary-imgs"/></div>
            <div className="col-4 p-1"><img src={productDetails.images_url[3]} className="product-page-secondary-imgs"/></div>
        </div>
    )
}

const PRICING_CONTAINER = (
    <>
    <div className="d-flex">
        {productDetails.on_sale && ( <span className="old-price me-3">Rs. {formatNumber(productDetails.product_price_old)}.00</span> )}
        <span className="new-price">Rs. {formatNumber(productDetails.product_price_new)}.00</span>    
    </div>
        {productDetails.on_sale && ( <p className="text-danger"> Save Rs. {formatNumber(productDetails.product_price_old - productDetails.product_price_new)}.00 </p> )}
    </>
)

  return (
    <div>
      <Navbar />
      {/* //!-------------------------------------- BREADCRUMB AND TITLE ---------------- */}
      <div className="row m-0">
        <div className="col p-0 px-5">
          <BreadCrumb items={breadcrumbItems} />
          <div className="row m-0 mt-5 justify-content-center mb-2">
            <div className="col-12 col-lg-10 align-self-center">
              <div className="row justify-content-center">
                
{/* //!-------------------------------------- image will be shown on top under md ---------------- */}
               <div className="col-12 col-sm-10 col-md-6 d-md-none d-block mb-3">
               {getComponent()}
                </div>
                <div className="col-12 col-md-6 p-2">
                  <p className="product-card-modal-name"> {productDetails.product_name} </p>
                  <div className="price-rating-container">
                    <div className="price-container">
                     {PRICING_CONTAINER}
                    </div>
                    {/* <Rate allowHalf defaultValue={productDetails.average_rating} /> */}
                  </div>
                    <div className="product-single-page-description">
                    <p className="product-card-modal-sizes">Description</p>
                        <p>{productDetails.product_description}</p>
                    </div>
                  <div>
                    <p className="product-card-modal-sizes">Sizes Available</p>
                    {productDetails.sizes_available.map((item) => (
                      <p className="product-card-modal-sizes-single" key={item}> {item} </p>
                    ))}
                  </div>
                  <div>
                    <p className="product-card-modal-sizes bottom-0">Quantity</p>
                    <p>Available in Stock : {productDetails.quantity_available}</p> <br />
                    <Quantity min={1} max={productDetails.quantity_available} defaultValue={1} onChange={(q)=>setQuantityVal(q)}/>
                    <div className="text-center mt-5 mb-2">
                      <Button className="dark-btn" onClick={()=>handleAddToCart(productDetails,QuantityVal,CART_ITEMS,dispatch)}>Add to Cart</Button>
                      {/* <Button className="light-btn">Add to Wishlist</Button> */}
                    </div>
                  </div>
                  <div> 
                    <p className='m-0 mt-3'><i className="fa-solid fa-truck me-3"></i><b>Estimated Delivery: </b>{calculateDeliveryDate(productDetails.estimated_delivery_days)}</p>
                    <p className="m-0"><i class="fa-solid fa-boxes-stacked me-3"></i><b>Free Shipping and Returns :</b> On all orders over 10,000</p>
                  </div>
                </div>
                
{/* //!-------------------------------------- image will be shown on right above md ---------------- */}
                <div className="col-12 col-md-6 d-md-block d-none">
                  
                {getComponent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductPage;
