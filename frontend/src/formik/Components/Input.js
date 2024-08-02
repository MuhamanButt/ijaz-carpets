import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import '../styles.css';

const Input = (props) => {
  const { label, name, placeholder,readOnly, ...rest } = props;
  return (
    <>
      <div className="form-control formik-input mt-3 py-2">
        <Field id={name} name={name} readOnly ={readOnly} placeholder={placeholder}{...rest} />
      </div>
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};

export default Input;
