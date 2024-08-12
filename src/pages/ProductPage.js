import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Carousel, Spin, message,Collapse } from "antd";
import Navbar from "../components/Navbar";
import BreadCrumb from "../components/BreadCrumb";
import Quantity from "../less_use/Quantity";
import Footer from "../components/Footer";
import { calculateDeliveryDate, formatNumber, generateBreadcrumbs, handleAddToCart } from "../utils/Important_functions";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from '../redux/Cart.js/Action';
import { API_GET_PRODUCT } from "../api/api_product";
import './styles/ProductPage.css';
import ContactForm from "../components/ContactForm";

const { Panel } = Collapse;

const ProductPage = () => {
    const [quantityVal, setQuantityVal] = useState(1);
    const [productDetails, setProductDetails] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    
    const location = useLocation();
    const dispatch = useDispatch();
    const CART_ITEMS = useSelector((state) => state.cart.items);

    const path = window.location.pathname;
    const breadcrumbItems = generateBreadcrumbs(path);
    const lastItem = breadcrumbItems[breadcrumbItems.length - 1]; // last item to show in title

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const fetchProduct = async () => {
            setShowSpinner(true);
            try {
                const response = await API_GET_PRODUCT(lastItem.title.toLowerCase());
                setProductDetails(response.data);
            } catch (error) {
                console.error(error);
                message.error("Failed to fetch product details.");
            } finally {
                setShowSpinner(false);
            }
        };

        if (lastItem.title) {
            fetchProduct();
        }
    }, [lastItem.title]);

    const getComponent = () => (
        <div className="row m-0 justify-content-center mb-5">
            <div className="col-12 p-0">
                <Carousel arrows draggable fade>
                    {productDetails?.images_url.map((url, index) => (
                        <div key={index}>
                            <img src={url} alt={`Product image ${index + 1}`} className="product-modal-image" />
                        </div>
                    ))}
                </Carousel>
            </div>
            {productDetails?.images_url[1] && <div className="col-4 p-1"><img src={productDetails?.images_url[1]} className="product-page-secondary-imgs" alt="Secondary" /></div>}
            {productDetails?.images_url[2] &&<div className="col-4 p-1"><img src={productDetails?.images_url[2]} className="product-page-secondary-imgs" alt="Secondary" /></div>}
            {productDetails?.images_url[3] &&<div className="col-4 p-1"><img src={productDetails?.images_url[3]} className="product-page-secondary-imgs" alt="Secondary" /></div>}
        </div>
    );

    const PRICING_CONTAINER = (
        <>
            <div className="d-flex">
                {productDetails?.on_sale && (
                    <span className="old-price me-3">Rs. {formatNumber(productDetails?.product_price_old)}.00</span>
                )}
                <span className="new-price">Rs. {formatNumber(productDetails?.product_price_new)}.00</span>
            </div>
            {productDetails?.on_sale && (
                <p className="text-danger">Save Rs. {formatNumber(productDetails?.product_price_old - productDetails?.product_price_new)}.00</p>
            )}
        </>
    );

    return (
        <div>
            <Navbar />
            {showSpinner && <Spin fullscreen />}
            {/* Breadcrumb and Title */}
            {!productDetails?.hide&&
            <div className="row m-0">
                <div className="col p-0 px-5 pt-3">
                    <BreadCrumb items={breadcrumbItems} />
                    <div className="row m-0 mt-3 justify-content-center mb-2">
                        <div className="col-12 col-lg-10 align-self-center">
                            <div className="row justify-content-center">
                                {/* Image shown on top under md */}
                                <div className="col-12 col-sm-10 col-md-6 d-md-none d-block mb-3" data-aos="fade-up">
                                    {getComponent()}
                                </div>
                                <div className="col-12 col-md-6 p-2"data-aos="fade-up">
                                    <p className="product-card-modal-name">{productDetails?.product_name}</p>
                                    <div className="price-rating-container">
                                        <div className="price-container">
                                            {PRICING_CONTAINER}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="product-card-modal-sizes">Sizes Available</p>
                                        {productDetails?.sizes_available.map((item) => (
                                            <p className="product-card-modal-sizes-single" key={item}>{item}</p>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="product-card-modal-sizes bottom-0">Quantity</p>
                                        {productDetails?.out_of_stock ? <b className='text-danger'><p>Out of Stock</p></b>
                                        :<p>Available in Stock : {productDetails?.quantity_available}</p> }
                                        
                                        <Quantity min={1} max={productDetails?.quantity_available} defaultValue={1} onChange={(q) => setQuantityVal(q)} />
                                        <div className="text-center mt-5 mb-2">
                                            <Button className="dark-btn" disabled= {productDetails?.out_of_stock} onClick={() => handleAddToCart(productDetails, quantityVal, CART_ITEMS, dispatch)}>Add to Cart</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='m-0 mt-3'><i className="fa-solid fa-truck me-3"></i><b>Estimated Delivery: </b>{calculateDeliveryDate(productDetails?.estimated_delivery_days)}</p>
                                        <p className="m-0"><i className="fa-solid fa-boxes-stacked me-3"></i><b>Free Shipping and Returns:</b> On all orders over 10,000</p>
                                    </div>
                                    <div className="row m-0 mt-3">
                                    <Collapse>
                                        <Panel header="Ask a Question" key="1">
                                            <ContactForm product_id={productDetails?.product_id} />
                                        </Panel>
                                    </Collapse>
                                    </div>
                                </div>
                                {/* Image shown on right above md */}
                                <div className="col-12 col-md-6 d-md-block d-none" data-aos="fade-up">
                                    {getComponent()}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 product-single-page-description">
                       
                        <p className="product-card-modal-sizes">Description</p>
                        <div dangerouslySetInnerHTML={{ __html: productDetails?.product_description }} />
             
                        </div>
                    </div>
                </div>
            </div>}
            <Footer />
        </div>
    );
};

export default ProductPage;
