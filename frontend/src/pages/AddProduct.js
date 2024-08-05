import React from "react";
import { useState } from "react";
import './styles/AddProduct.css';
import { Form, Formik } from "formik";
import FormikControl from "../formik/FormikControl";
import { ADD_PRODUCT_FORM_INITIAL_VALUES } from "../formik/initialValues";
import { ADD_PRODUCT_FORM_VALIDATION_SCHEMA } from "../formik/validationSchema";
import { PRODUCT_TYPE, RUG_SIZES } from "../values/homePageData";
import { API_CREATE_PRODUCT } from "../api/api_product";
import {Spin} from 'antd'
import { CONVERT_TO_KEBAB_CASE, CONVERT_TO_TITLE_CASE } from "../utils/Important_functions";

const AddProduct = () => {
    const [ShowSpinner, setShowSpinner] = useState(false);


    const onSubmit = async (values, { resetForm }) => {

        setShowSpinner(true);

            // values.product_price_old = values.product_price_old == '' ? '0' :values.product_price_old
            const response = await API_CREATE_PRODUCT(values);
            if (response) {
                resetForm(); // Reset the form after successful submission
            }
            setShowSpinner(false);
    };
    
    
    
      
  return (
    <>
    {ShowSpinner && <Spin fullscreen />}
      <div className="row m-0">
        <div className="col p-0 px-5 pt-3 pt-sm-4 admin-heading">
          <p>Add New Product</p>
        </div>
      </div>
      <div className="row m-0 admin-main">
        <div className="col p-0">
          <Formik  initialValues={ADD_PRODUCT_FORM_INITIAL_VALUES}  validationSchema={ADD_PRODUCT_FORM_VALIDATION_SCHEMA}  onSubmit={onSubmit} >
            {formik => (
              <Form>
                <div className="row m-0 mt-3 px-lg-3 ">
                  <div className="col-12 px-1 px-sm-3">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <FormikControl control="input" type="text" name="product_name" placeholder="Product Name" />
                        </div>
                        <div className="col-12 col-md-6">
                           <FormikControl control="select" name="product_type" options={PRODUCT_TYPE} placeholder="Select product type"/>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-5">
                                <div className="row">
                                    <div className="col-12">
                                        <FormikControl control="input" type="number" name="product_price_old" placeholder="Old Price" />
                                    </div>
                                    <div className="col-12">
                                        <FormikControl control="input" type="number" name="product_price_new" placeholder="New Price" />
                                    </div>
                                    <div className="col-12">
                                        <FormikControl control="input" type="number" name="quantity_available" placeholder="Quantity Available" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-7">
                                <div className="col-12">
                                    <FormikControl control="input" type="number" name="estimated_delivery_days" placeholder="Estimated Delivery Days" />
                                </div>
                                <div className="col-12">
                                    <FormikControl control="fileUpload" name="images_url" maxCount = {4}/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-12">
                            <FormikControl control="select" name="sizes_available" options={RUG_SIZES} multiple placeholder="Select Size"/>
                        </div>
                        <div className="col-12">
                            <FormikControl control="quill" name="product_description" placeholder="Product Description" height={200}/>
                        </div>
                        
                        
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-3 px-lg-3">
                  <div className="col-12 px-1 px-sm-3">
                    <button type="submit" className="btn add-product-btn">Add Product</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
