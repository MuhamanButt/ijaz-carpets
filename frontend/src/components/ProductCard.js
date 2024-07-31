import React, { useEffect,useState } from 'react';
import './styles/ProductCard.css';
import { formatNumber } from '../utils/Important_functions';
import { Modal } from 'antd';

const ProductCard = ({ productDetails }) => {
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        console.log(productDetails);
    }, [productDetails]);

    return (<>
    
    <Modal
        title="Vertically centered modal dialog"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
        <div className="row product-card p-2">
            <div className="col-12 pt-3 px-3">
                <div className="image-container">
                    <img
                        src={productDetails.images_url[0]}
                        alt=""
                        className="product-card-image"
                    />
                    <div className="icons-container text-center">
                        <i className="fas fa-heart icon1"></i>
                        <i className="fas fa-eye icon2" onClick={()=>setOpenModal(true)}></i>
                    </div>
                </div>
                <p className="product-card-name">
                    {productDetails.product_name.slice(0, 45)}..
                </p>
                <p className="product-card-price">
                    Rs. {formatNumber(productDetails.product_price_new)}.00
                </p>
            </div>
        </div>
        </>
    );
};

export default ProductCard;
