import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import '../styles.css'

const Checkbox = (props) => {
  const {...rest } = props;
  return (
    <div className="form-control">
      <Field type="checkbox" {...rest} />
      <label htmlFor={rest.id}>{rest.label}</label>
      <ErrorMessage name={rest.name} component={TextError} />
    </div>
  );
};

export default Checkbox;
