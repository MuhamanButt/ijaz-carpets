import React, { useEffect, useState } from 'react';
import './styles/ProductCard.css';
import { calculateDeliveryDate, formatNumber, GENERATE_URL, handleAddToCart } from '../utils/Important_functions';
import { Button, Modal, InputNumber, message,Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from '../redux/Cart.js/Action';
import Quantity from '../less_use/Quantity';
import sale_icon from '../assets/icons/sale.svg'
import { DOMAIN_NAME } from '../values/Domain';

const ProductCard = ({ productDetails }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [QuantityVal, setQuantityVal] = useState(1);
    const CART_ITEMS = useSelector((state) => state.cart.items);


    const handleProductClick = () => {
        const currentPath = window.location.pathname;
        const newPath = `${GENERATE_URL(productDetails.product_type,productDetails.product_id)}`;
        navigate(newPath, { state: { productDetails } });
    };


    const PRICING_CONTAINER = (
        <>
        <div className="d-flex">
            {productDetails.on_sale && ( <span className="old-price me-3">Rs. {formatNumber(productDetails.product_price_old)}.00</span> )}
            <span className="new-price">Rs. {formatNumber(productDetails.product_price_new)}.00</span>    
        </div>
            {productDetails.on_sale && ( <p className="text-danger"> Save Rs. {formatNumber(productDetails.product_price_old - productDetails.product_price_new)}.00 </p> )}
        </>
    )
    

    const cardData = (
        <div className="row product-card p-2 p-sm-3 p-md-2 p-lg-2 p-xl-3">
          <div className="col-12 pt-3 px-3">
            <div className="image-container"  data-aos="fade">
              <img  src={productDetails.images_url[0]}  alt=""  className="product-card-image"  onClick={handleProductClick}  />
              <div className="icons-container text-center"> <i className="fas fa-eye icon2" onClick={() => setOpenModal(true)} ></i> </div>
            </div>
            <p className="product-card-name" onClick={handleProductClick}> {productDetails.product_name.length > 45 ? `${productDetails.product_name.slice(0, 45)}..` : productDetails.product_name}</p>

            {productDetails.sizes_available.map((item) => ( <p className='product-card-sizes-single mb-0' key={item}>{item}</p> ))}
            <div className="price-container" onClick={handleProductClick}>
            {PRICING_CONTAINER}
            {productDetails.out_of_stock && <b><p className='text-danger m-0'>Out of Stock</p></b>}
            </div>
            <div className="row text-center">
              <div className="col">
                <Button className='light-btn' 
                disabled= {productDetails.out_of_stock}
                onClick={() => handleAddToCart(productDetails, QuantityVal, CART_ITEMS, dispatch)}> Add To Cart </Button>
              </div>
            </div>
          </div>
        </div>
      );
    return (
        <>
            <Modal centered width={1000} open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <img src={productDetails.images_url[0]} alt="" className="product-modal-image"/>
                    </div>
                    <div className="col-12 col-sm-6 p-2">
                        <p className='product-card-modal-name'>{productDetails.product_name}</p>
                            {PRICING_CONTAINER}
                        <div>
                            <p className='product-card-modal-sizes'>Sizes</p>
                            {productDetails.sizes_available.map((item) => ( <p className='product-card-modal-sizes-single' key={item}>{item}</p> ))}
                        </div>
                        <div>
                            <p className='product-card-modal-sizes'>Quantity</p>
                            {productDetails.out_of_stock ? <b className='text-danger'><p>Out of Stock</p></b>
                            :<p>Available in Stock : {productDetails.quantity_available}</p> }<br />
                            <Quantity min={1} max={productDetails.quantity_available} defaultValue={1} onChange={(q)=>setQuantityVal(q)}/>
                            <div className='text-center'>
                                <Button className='dark-btn' disabled= {productDetails.out_of_stock} onClick={()=>handleAddToCart(productDetails,QuantityVal,CART_ITEMS,dispatch)}>Add to Cart</Button>
                                {/* <Button className='light-btn'>Add to Wishlist</Button> */}
                            </div>
                        </div>
                        <div>
                            <p className='m-0 mt-3'><i className="fa-solid fa-truck me-3"></i><b>Estimated Delivery: </b>{calculateDeliveryDate(productDetails.estimated_delivery_days)}</p>
                            <p className="m-0"><i class="fa-solid fa-boxes-stacked me-3"></i><b>Free Shipping and Returns :</b> On all orders over 10,000</p>
                        </div>
                    </div>
                </div>
            </Modal>
            {
              productDetails.on_sale ?  <Badge.Ribbon text="Sale" color="red"> {cardData} </Badge.Ribbon> : cardData
            }
        </>
    );
};

export default ProductCard;
