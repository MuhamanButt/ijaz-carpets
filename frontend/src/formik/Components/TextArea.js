import React from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from 'antd';
import TextError from "./TextError";
import '../styles.css';

const { TextArea: AntTextArea } = Input;

const CustomTextArea = ({ label, name, placeholder, readOnly, ...rest }) => {
  return (
    <>
      <div className="form-control formik-input mt-3 py-2">
        <Field name={name}>
          {({ field, form }) => (
            <>
              <AntTextArea
                id={name}
                {...field}
                {...rest}
                placeholder={placeholder}
                readOnly={readOnly}
                value={field.value}
                onChange={e => form.setFieldValue(name, e.target.value)}
                onBlur={() => form.setFieldTouched(name, true)}
              />
              <ErrorMessage name={name} component={TextError} />
            </>
          )}
        </Field>
      </div>
    </>
  );
};

export default CustomTextArea;
