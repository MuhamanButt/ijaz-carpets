import React from 'react'
import { useState,useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BreadCrumb from '../components/BreadCrumb'
import { Table, Button, message,Badge,Collapse,Divider} from "antd";
import { formatNumber, generateBreadcrumbs } from '../utils/Important_functions'
import { useSelector } from 'react-redux';
import CheckoutSummary from '../components/CheckoutSummary';
import './styles/CheckoutPage.css'
import Checkout_Form from '../less_use/Checkout_Form';
import { DELIVERY_CHARGES, FREE_SHIPPING_ABOVE } from '../values/homePageData';
const CheckoutPage = () => {

    
    const path = window.location.pathname;
    const breadcrumbItems = generateBreadcrumbs(path);
    const lastItem = breadcrumbItems[breadcrumbItems.length - 1]; // last item to show in title
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const CART_ITEMS = useSelector((state) => state.cart.items);
    const totalQuantity = CART_ITEMS.reduce( (acc, item) => acc + (item.quantity || 0), 0 );
    const totalPrice = CART_ITEMS.reduce( (acc, item) => acc + (item.quantity || 0) * item.product_price_new, 0 );


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

const onCompleteOrder =()=>{
    console.log("ORDER COMPLETED")
}

    const CHECKOUT_ITEMS = (<>
        <div className="row m-0 checkout-item pb-4 mt-1 mt-lg-5 " style={{backgroundColor:"#f2f2f1"}}>
            <p className='checkout-title'>
                Order Summary
            </p>
            {CART_ITEMS.map((item) => (
              <>
                <div className="col-8 text-start align-self-center mt-3" key={item.id}> 
                    <div className="row">
                        <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-3">
                            <Badge count={item.quantity} className='me-4'>
                                <img  src={item.images_url[0]}  alt={item.product_name}  className="checkout-img"  />
                            </Badge>
                        </div>
                    <div className="col-8 col-sm-9 col-md-10 col-lg-8 col-xl-9">{item.product_name.slice(0, 40)}...</div>
                    </div>
                </div>
                <div className="col-4 text-end align-self-center">
                  Rs. {formatNumber(item.product_price_new)}.00
                </div>
                
                <Divider orientation="left" className='mb-0 mt-3'/>
            </>
            ))}
        </div>
          
        <div className="row m-0 pb-3 pt-3" style={{backgroundColor:"#f2f2f1"}}>
            <div className="col-12 text-end total-summary">
                <p><b>Delivery Charges: </b> {totalPrice>FREE_SHIPPING_ABOVE ? 0 : DELIVERY_CHARGES}.00 Rs</p>
                <p><b>Product Charges: </b> {formatNumber(totalPrice)}.00 Rs</p>
                <p className='mt-3'><b>Estimated Total: </b> {formatNumber(totalPrice>FREE_SHIPPING_ABOVE ? totalPrice : totalPrice + DELIVERY_CHARGES)}.00 Rs</p>
                <p><b>Total Quantity:</b> {totalQuantity}</p>
            </div>
        </div> 
        </>
    )

    const COLLAPSE_LABEL = (
      <div className="row">
        <div className="col-7">Show order summary..</div>
        <div className="col-5 text-end">
          <b>Rs. {formatNumber(totalPrice>FREE_SHIPPING_ABOVE ? totalPrice : totalPrice+DELIVERY_CHARGES)}.00</b>
        </div>
      </div>
    );
  return (
    <div>
      <Navbar />
      <div className="row m-0">
        <div className="col p-0 px-5 text-center mt-2">
           <h2>Checkout</h2>
        </div>
      </div>

      <div className="row m-0 px-0 px-sm-3">
        {windowWidth < 992 &&
            <div className="col-12">
                <Collapse size="small" items={[ { key: '1', label: COLLAPSE_LABEL, children:CHECKOUT_ITEMS, }, ]} />
            </div>
        }
        <div className="col-12 col-lg-6">
            <Checkout_Form onCompleteOrder={onCompleteOrder}/>
        </div>
        <div className="col-12 col-lg-6" >
          {windowWidth >= 992 && CHECKOUT_ITEMS}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage


