import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Checkbox, Input, Select } from 'antd';
import * as Yup from 'yup';

const { Option } = Select;

const OrderEditForm = ({ order, onSubmit }) => {
  const validationSchema = Yup.object({
    is_completed: Yup.boolean(),
    is_viewed: Yup.boolean(),
    is_important: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={{
        ...order,
        is_completed: order.is_completed || false,
        is_viewed: order.is_viewed || false,
        is_important: order.is_important || false,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <div>
            <Checkbox
              name="is_completed"
              checked={values.is_completed}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Completed
            </Checkbox>
          </div>
          <div>
            <Checkbox
              name="is_viewed"
              checked={values.is_viewed}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Viewed
            </Checkbox>
          </div>
          <div>
            <Checkbox
              name="is_important"
              checked={values.is_important}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Important
            </Checkbox>
          </div>
          <Button type="submit" htmlType="submit" className="btn add-product-btn">Confirm Changes</Button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderEditForm;
