import React from 'react';
import { Formik, Form } from 'formik';
import { UPDATE_PRODUCT_FORM_VALIDATION_SCHEMA } from '../formik/validationSchema';
import { Button } from 'antd';
import { PRODUCT_TYPE, RUG_SIZES } from '../values/homePageData';
import FormikControl from '../formik/FormikControl';

const ProductEditForm = ({ product, onSubmit }) => {
  // Options for radio buttons
  const visibilityOptions = [
    { key: 'Show', value: 'false' },
    { key: 'Hide', value: 'true' }
  ];

  const stockOptions = [
    { key: 'In Stock', value: 'false' },
    { key: 'Out of Stock', value: 'true' }
  ];

  return (
    <Formik
      initialValues={{
        ...product,
        hide: product.hide ? 'true' : 'false',
        out_of_stock: product.out_of_stock ? 'true' : 'false'
      }}
      validationSchema={UPDATE_PRODUCT_FORM_VALIDATION_SCHEMA}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {formik => (
        <Form>
          <FormikControl control="input" type="text" name="product_name" placeholder="Product Name"/>
          <FormikControl control="select" name="product_type" options={PRODUCT_TYPE} placeholder="Select product type"/>
          <FormikControl control="input" type="number" name="product_price_old" placeholder="Old Price"/>
          <FormikControl control="input" type="number" name="product_price_new" placeholder="New Price"/>
          <FormikControl control="input" type="number" name="quantity_available" placeholder="Quantity Available"/>
          <FormikControl control="input" type="number" name="estimated_delivery_days" placeholder="Estimated Delivery Days"/>
          <FormikControl control="select" name="sizes_available" options={RUG_SIZES} multiple placeholder="Select Size"/>
          <FormikControl control="quill" name="product_description" placeholder="Product Description" height={200}/>
          <FormikControl control="radio" label="Visibility" name="hide" options={visibilityOptions}/>
          <FormikControl control="radio" label="Stock Status" name="out_of_stock" options={stockOptions}/>

          <Button type="submit" htmlType="submit" className="btn add-product-btn">Confirm Changes</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductEditForm;
