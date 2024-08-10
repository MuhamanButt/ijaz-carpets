import axios from "axios";
import { message } from "antd";
import { DOMAIN_NAME } from "../values/Domain";
import { CONVERT_TO_KEBAB_CASE } from "../utils/Important_functions";


export const API_PLACE_ORDER = async (values, CART_ITEMS) => {
    values["is_completed"] = false;
    values["is_viewed"] = false;
    values["is_important"] = false;
    values["items"] = JSON.stringify(CART_ITEMS); // Serialize items array
  
    // Create a FormData object
    const formData = new FormData();
  
    // Append all form values to FormData
    Object.keys(values).forEach((key) => {
      if (key === 'transaction_url') {
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });
  
    console.log('FormData content:', formData);
  
    try {
      const response = await axios.post(
        `${DOMAIN_NAME}/order/create_order/`,
        formData,
      );
      message.success("Your order has been placed successfully. A confirmation email will be sent to you shortly.");
      return true;
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "An unknown error occurred."
      );
      return false;
    }
  };
  
  



export const API_GET_ORDERS = async () => {
  try {
      const response = await axios.get(`${DOMAIN_NAME}/order/get_all_orders/`);
    
    message.success(response?.data?.message || "Orders Fetched successfully");
    return response;
  } catch (error) {
    console.error(error);
    message.error(
      error.response?.data?.message || "An unknown error occurred."
    );
    return false;
  }
};



// Function to update an order
export const API_UPDATE_ORDER = async (values) => {
    console.log(values)
    try {
      const response = await axios.put(
        `${DOMAIN_NAME}/order/update_order/`,
        values
      );
      message.success(response?.data?.message || "Order updated successfully");
      return true;
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "An unknown error occurred."
      );
      return false;
    }
  };