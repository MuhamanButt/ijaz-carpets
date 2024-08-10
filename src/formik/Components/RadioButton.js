import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import { Radio } from 'antd';
import TextError from "./TextError";
import '../styles.css'; // Ensure this path is correct

const RadioButton = (props) => {
  const { label, name, options, ...rest } = props;
  const [field, , { setValue }] = useField(name);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="form-control">
      <label className="form-control-label">{label}</label>
      <Radio.Group
        value={field.value}
        onChange={handleChange}
        {...rest}
      >
        {options.map((option) => (
          <Radio key={option.key} value={option.value} className="form-control-option">
            {option.key}
          </Radio>
        ))}
      </Radio.Group>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default RadioButton;
