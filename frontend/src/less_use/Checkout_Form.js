import React, { useState, useEffect } from 'react';
import { Formik, Form } from "formik";
import { Collapse, Divider, message, Modal, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import FormikControl from '../formik/FormikControl';
import { CHECKOUT_FORM_INITIAL_VALUES } from '../formik/initialValues';
import { CHECKOUT_FORM_VALIDATION_SCHEMA } from '../formik/validationSchema';
import { useSelector } from 'react-redux';
import { formatNumber } from '../utils/Important_functions';
import { BANK_INFO, DELIVERY_CHARGES, FREE_SHIPPING_ABOVE } from '../values/homePageData';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './styles/Checkout_Form.css';
import { API_PLACE_ORDER } from '../api/api_orders';
import {Spin} from 'antd'
import { clearCart } from '../redux/Cart.js/Action';

const Checkout_Form = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [ShowSpinner, setShowSpinner] = useState(false);
    const CART_ITEMS = useSelector((state) => state.cart.items);
    const totalQuantity = CART_ITEMS.reduce((acc, item) => acc + (item.quantity || 0), 0);
    const totalPrice = CART_ITEMS.reduce((acc, item) => acc + (item.quantity || 0) * item.product_price_new, 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [FORM_VALUES, setFORM_VALUES] = useState([]);
    const [screenshot, setScreenshot] = useState(null); // State for storing the screenshot file

    const showModal = () => setIsModalOpen(true);
    const handleOk = async() => {

        if(!screenshot){
            message.error("Please provide transaction screenshot to move forward")
            return
        }
        setShowSpinner(true)
        setIsModalOpen(false);
        FORM_VALUES['is_shipping_applied'] = !(totalPrice > FREE_SHIPPING_ABOVE)
        FORM_VALUES['total_amount'] = totalPrice > FREE_SHIPPING_ABOVE ? totalPrice : totalPrice + DELIVERY_CHARGES
        FORM_VALUES['transaction_url'] = screenshot

        const response = await API_PLACE_ORDER(FORM_VALUES,CART_ITEMS)
        
        setShowSpinner(false)
        if(response)
            dispatch(clearCart())
            navigate('/');
    };
    const handleCancel = () => setIsModalOpen(false);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onSubmit = (values) => {
        setFORM_VALUES(values);
        showModal();
    };

    const BANK_DETAILS = (
        <>
            {BANK_INFO.map((item) => (
                <React.Fragment key={item.account_number}>
                    <div className="row">
                        <div className="col-2 align-self-center text-center">
                            <img src={item.logo_url} alt={item.bank} style={{ height: "50px", width: "50px", objectFit: "cover" }} />
                        </div>
                        <div className="col-10">
                            <p style={{ fontWeight: "600", margin: "0px" }}>
                                Title : {item.title} <br />
                                Bank Name : {item.bank} <br />
                                Account No : {item.account_number} <br />
                                IBAN : {item.iban} <br />
                            </p>
                        </div>
                    </div>
                    <Divider orientation="left" />
                </React.Fragment>
            ))}
        </>
    );

    const handleChange = ({ file }) => {
        
        // if (file.status === 'done') {
            setScreenshot(file.originFileObj);
        // }
    };
    

    const itemRender = (originNode, file, fileList, actions) => {
        return (
            <div className="ant-upload-list-item ant-upload-list-item-rtl">
                <div className="ant-upload-list-item-info">
                    <span>
                        <span className="ant-upload-list-item-name ant-upload-list-item-name-icon-count-1 text-dark" style={{fontWeight:"500"}}>{file.originFileObj.name}</span>
                    </span>
                </div>
            </div>
        );
    };

    return (
        <>
            {ShowSpinner && <Spin fullscreen />}
            <Formik initialValues={CHECKOUT_FORM_INITIAL_VALUES} validationSchema={CHECKOUT_FORM_VALIDATION_SCHEMA} onSubmit={onSubmit}>
                {formik => (
                    <Form>
                        <div className="row m-0 mt-3 p-lg-3 p-xl-5">
                            <div className="col-12 px-1 px-sm-3">
                                <p className='checkout-form-field-heading'>Contact</p>
                                <FormikControl control="input" type="email" name="email" placeholder="Email" />
                                <FormikControl control="input" type="phone" name="phone" placeholder="Phone" />
                            </div>
                            <div className="col-12 px-1 px-sm-3">
                                <p className='checkout-form-field-heading'>Delivery</p>
                                <FormikControl control="input" type="text" name="country" readOnly={true} placeholder="Pakistan" />
                            </div>
                            <div className="col-6 px-1 px-sm-3">
                                <FormikControl control="input" type="text" name="firstName" placeholder="First Name" />
                            </div>
                            <div className="col-6 px-1 px-sm-3">
                                <FormikControl control="input" type="text" name="lastName" placeholder="Last Name (optional)" />
                            </div>
                            <div className="col-12 px-1 px-sm-3">
                                <FormikControl control="input" type="text" name="address" placeholder="Address" />
                            </div>
                            <div className="col-6 px-1 px-sm-3">
                                <FormikControl control="input" type="text" name="city" placeholder="City" />
                            </div>
                            <div className="col-6 px-1 px-sm-3">
                                <FormikControl control="input" type="text" name="postalCode" placeholder="Postal Code" />
                            </div>
                            <div className="col-12 px-1 px-sm-3">
                                <p className='checkout-form-field-heading mb-3'>Payment</p>
                                <Collapse size="medium">
                                    <Collapse.Panel header="Bank Deposit" key="1">
                                        {BANK_DETAILS}
                                    </Collapse.Panel>
                                </Collapse>
                            </div>
                        </div>

                        <div className="row m-0 mt-3">
                            <div className="col-12 text-end total-summary">
                                {windowWidth < 992 && (
                                    <>
                                        <p><b>Delivery Charges: </b> {totalPrice > FREE_SHIPPING_ABOVE ? 0 : DELIVERY_CHARGES}.00 Rs</p>
                                        <p><b>Product Charges: </b> {formatNumber(totalPrice)}.00 Rs</p>
                                        <p className='mt-3'><b>Estimated Total: </b> {formatNumber(totalPrice > FREE_SHIPPING_ABOVE ? totalPrice : totalPrice + DELIVERY_CHARGES)}.00 Rs</p>
                                        <p><b>Total Quantity:</b> {totalQuantity}</p>
                                    </>
                                )}
                                <button type="submit" className="dark-btn mb-4" style={{ padding: "10px", borderRadius: "10px" }}>
                                    <i className="fa-solid fa-check"></i> Complete Order
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <Modal
                title="Upload Transaction Screenshot"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Upload.Dragger
                    name="files"
                    maxCount={1}
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleChange} // Handle file change
                    itemRender={itemRender}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Upload screenshot of transaction to confirm order</p>
                </Upload.Dragger>
            </Modal>
        </>
    );
};

export default Checkout_Form;
