import axios from "axios";
import { message } from "antd";
import { DOMAIN_NAME } from "../values/Domain";
import { CONVERT_TO_KEBAB_CASE } from "../utils/Important_functions";


export const API_GET_SETTINGS = async () => {
    try {
      const response = await axios.get(`${DOMAIN_NAME}/settings/get_settings/`);
      console.log(response);
      message.success(response?.data?.message || "Settings Fetched successfully");
      return response;
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "An unknown error occurred."
      );
      return false;
    }
  };

  export const API_SET_SETTINGS = async (settings) => {
    
    console.log(settings)
    const formData = new FormData();

  // Append non-file fields to formData
    Object.keys(settings).forEach((key) => {
    formData.append(key, settings[key]); // Corrected this line
  });
    
    try {
      const response = await axios.put(`${DOMAIN_NAME}/settings/set_settings/`,formData);
      console.log(response);
      message.success(response?.data?.message || "Settings Set successfully");
      return response;
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "An unknown error occurred."
      );
      return false;
    }
  };