import React from "react";
import Input from "./Components/Input";
import TextArea from "./Components/TextArea";
import Select from "./Components/Select";
import RadioButton from "./Components/RadioButton";
import Checkbox from "./Components/Checkbox";
import Quill from "./Components/Quill";
import FileUpload from "./Components/FileUpload";

const FormikControl = (props) => {
  const { control,...rest } = props;
  switch (control) {
    case "input": return <Input {...rest}/>
    case "textarea":return <TextArea {...rest}/>
    case "select":return<Select {...rest}/>
    case "radio":return <RadioButton {...rest}/>
    case "checkbox":return<Checkbox {...rest}/>
    case "quill":return<Quill {...rest}/>
    case "fileUpload":return<FileUpload {...rest}/>
    default:
      return null;
  }
};

export default FormikControl;
