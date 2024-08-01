import React, { useEffect, useState } from 'react';
import './styles/ProductCard.css';
import { calculateDeliveryDate, formatNumber, handleAddToCart } from '../utils/Important_functions';
import { Button, Modal, InputNumber, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from '../redux/Cart.js/Action';
import Quantity from '../less_use/Quantity';

const ProductCard = ({ productDetails }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [QuantityVal, setQuantityVal] = useState(1);
    const CART_ITEMS = useSelector((state) => state.cart.items);

    useEffect(() => {
        console.log(productDetails);
        console.log("CART_ITEMS", CART_ITEMS);
    }, [productDetails, CART_ITEMS]);

    
    
    

    const handleProductClick = () => {
        const currentPath = window.location.pathname;
        const newPath = `${currentPath}/${productDetails.product_id}`;
        navigate(newPath, { state: { productDetails } });
    };

    return (
        <>
            <Modal centered width={1000} open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <img src={productDetails.images_url[0]} alt="" className="product-modal-image"/>
                    </div>
                    <div className="col-12 col-sm-6 p-2">
                        <p className='product-card-modal-name'>{productDetails.product_name}</p>
                        <div className="price-rating-container">
                            <div className="price-container">
                                <span className="old-price"> Rs. {formatNumber(productDetails.product_price_old)}.00</span>
                                <b className="new-price"> Rs. {formatNumber(productDetails.product_price_new)}.00</b>
                            </div>
                            {/* <Rate allowHalf defaultValue={productDetails.average_rating} /> */}
                        </div>
                        <div>
                            <p className='product-card-modal-sizes'>Sizes</p>
                            {productDetails.sizes_available.map((item) => (
                                <p className='product-card-modal-sizes-single' key={item}>{item}</p>
                            ))}
                        </div>
                        <div>
                            <p className='product-card-modal-sizes'>Quantity</p>
                            <p>Available in Stock : {productDetails.quantity_available}</p> <br />
                            <Quantity min={1} max={productDetails.quantity_available} defaultValue={1} onChange={(q)=>setQuantityVal(q)}/>
                            <div className='text-center'>
                                <Button className='dark-btn' onClick={()=>handleAddToCart(productDetails,QuantityVal,CART_ITEMS,dispatch)}>Add to Cart</Button>
                                <Button className='light-btn'>Add to Wishlist</Button>
                            </div>
                        </div>
                        <div>
                            <i className="fa-solid fa-truck"></i> <b>Estimated Delivery: </b>{calculateDeliveryDate(productDetails.estimated_delivery_days)}
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="row product-card p-2">
                <div className="col-12 pt-3 px-3">
                    <div className="image-container">
                        <img src={productDetails.images_url[0]} alt="" className="product-card-image" onClick={handleProductClick} />
                        <div className="icons-container text-center">
                            <i className="fas fa-heart icon1"></i>
                            <i className="fas fa-eye icon2" onClick={() => setOpenModal(true)}></i>
                        </div>
                    </div>
                    <p className="product-card-name" onClick={handleProductClick}>
                        {productDetails.product_name.slice(0, 45)}..
                    </p>
                    <div className="price-container" onClick={handleProductClick}>
                        <span className="old-price">
                            Rs. {formatNumber(productDetails.product_price_old)}.00
                        </span>
                        <b className="new-price">
                            Rs. {formatNumber(productDetails.product_price_new)}.00
                        </b>
                    </div>
                    <div className="row text-center">
                        <div className="col">
                            <Button className='light-btn' onClick={()=>handleAddToCart(productDetails,QuantityVal,CART_ITEMS,dispatch)}>Add To Cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
