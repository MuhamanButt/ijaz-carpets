import React from "react";
import { Field, ErrorMessage } from "formik";
import { Select as AntSelect } from "antd";
import TextError from "./TextError";
import '../styles.css';

// Custom Select Component integrating Ant Design's Select with Formik
const CustomSelect = ({ label, name, options, multiple, ...rest }) => {
  return (
    <div className="form-control formik-input mt-3 py-2">
      <Field name={name}>
        {({ field, form }) => (
          <>
            <AntSelect
              mode={multiple ? "multiple" : undefined} // Set mode to 'multiple' if `multiple` is true
              style={{ width: "100%" }}
              id={name}
              {...rest}
              value={field.value} // Pass field.value to reflect selected options
              onChange={value => form.setFieldValue(name, value)}
              onBlur={() => form.setFieldTouched(name, true)}
            >
              {options.map((option) => (
                <AntSelect.Option key={option.value} value={option.value}>
                  {option.key}
                </AntSelect.Option>
              ))}
            </AntSelect>
            <ErrorMessage name={name} component={TextError} />
          </>
        )}
      </Field>
    </div>
  );
};

export default CustomSelect;
