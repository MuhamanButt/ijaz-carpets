import React, { useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import "../styles.css";
import ReactQuill from "react-quill";
import styles from "./Input.module.css";
import TextError from "./TextError";
import 'react-quill/dist/quill.snow.css';

const Quill = (props) => {
  const { label, name, placeholder,height, ...rest } = props;

  return (
    <div className="form-control formik-input mt-3 py-2" style={{height:`${height+60}px`}}>
      <Field id={name} name={name} {...rest}>
        {({ field }) => (
          <ReactQuill
            value={field.value}
            style={{ height: `${height}px`}}
            onChange={field.onChange(field.name)}
            placeholder={placeholder}
          />
        )}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Quill;
