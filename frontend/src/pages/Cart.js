import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatNumber, generateBreadcrumbs } from "../utils/Important_functions";
import BreadCrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import { clearCart, removeItemFromCart, updateItemQuantity } from "../redux/Cart.js/Action";
import { Table, Button, message } from "antd";
import './styles/Cart.css';
import Footer from "../components/Footer";
import CheckoutSummary from "../components/CheckoutSummary";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const path = window.location.pathname;
  const breadcrumbItems = generateBreadcrumbs(path);

  const CART_ITEMS = useSelector((state) => state.cart.items);
  const totalQuantity = CART_ITEMS.reduce( (acc, item) => acc + (item.quantity || 0), 0 );
  const totalPrice = CART_ITEMS.reduce( (acc, item) => acc + (item.quantity || 0) * item.product_price_new, 0 );


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    console.log(CART_ITEMS);
  }, [CART_ITEMS]);

  const handleRemoveItem = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const item = CART_ITEMS.find(item => item.product_id === productId);
    if (item) {
      if (newQuantity < 1) {
        message.error("Quantity cannot be less than 1.");
        return;
      }
      const validQuantity = Math.min(newQuantity, item.quantity_available);
      if (newQuantity > item.quantity_available) {
        message.error("Cannot update quantity. Exceeds available stock.");
        return;
      }
      dispatch(updateItemQuantity(productId, validQuantity));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProductClick = (path,productDetails) => {
    navigate(path, { state: { productDetails } });
};

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text, record) => (
        <div onClick={()=>handleProductClick(`/${record.product_type}/${record.product_id}`,record)}>
          <img src={record.images_url[0]} alt="" className="cart-item-img me-4 my-3" />
          {text.slice(0,40)}..
        </div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (

        <div className="actions-container">
          <div className="quantity-container">
          <Button  onClick={() => handleUpdateQuantity(record.product_id, quantity - 1)}  className="quantity-button" > - </Button>
          {quantity}
          <Button  onClick={() => handleUpdateQuantity(record.product_id, quantity + 1)}  className="quantity-button" > + </Button>
        </div>

        <i class="fa-solid fa-trash ms-5" onClick={()=>handleRemoveItem(record.product_id)}></i>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'product_price_new',
      key: 'product_price_new',
      render: (text) => `Rs. ${text}.00`,
    },
  ];
  const columns2 = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text, record) => (
        <>
        <div className="row">
            <div className="col-4">
                <img src={record.images_url[0]} alt="" className="cart-item-img-sm me-4" />    
            </div>
            <div className="col-8">
                <p>{text.slice(0,40)}..</p>
                <div className="actions-container">
                    <div className="quantity-container">
                        <Button  onClick={() => handleUpdateQuantity(record.product_id, record.quantity - 1)} disabled={record.quantity <= 1} className="quantity-button" > - </Button>
                        {record.quantity}
                        <Button  onClick={() => handleUpdateQuantity(record.product_id, record.quantity + 1)} disabled={record.quantity >= record.quantity_available} className="quantity-button" > + </Button>
                    </div>
                        <i class="fa-solid fa-trash ms-3 ms-md-5" onClick={()=>handleRemoveItem(record.product_id)}></i>
                    </div>
            </div>
        </div>
        </>
      )
    },
    {
      title: 'Price',
      dataIndex: 'product_price_new',
      key: 'product_price_new',
      render: (text) => `Rs. ${text}.00`,
    },
  ];

  const dataSource = CART_ITEMS.map(item => ({
    ...item,
    key: item.product_id,
  }));

  return (
    <div>
      <Navbar />
      <div className="row m-0">
        <div className="col p-0 px-5 text-center my-2">
           <h2>Cart</h2>
          <BreadCrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="row m-0">
        <div className="col p-0 px-3 px-md-5">
          {windowWidth > 690 ? 
          <>
            <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
            <CheckoutSummary totalPrice={totalPrice} totalQuantity={totalQuantity} onClearCart={handleClearCart} />
          </> 
          : 
          <>
            <Table columns={columns2} dataSource={dataSource} pagination={false}></Table>
            <CheckoutSummary totalPrice={totalPrice} totalQuantity={totalQuantity} onClearCart={handleClearCart} />
          </>
        }
        </div>
      </div>
      <Footer/>
    </div>
  );
};


export default Cart;
