import axios from "axios";
import { message } from "antd";
import { DOMAIN_NAME } from "../values/Domain";

export const API_SEND_MESSAGE = async (values) => {
  console.log(values);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/message/send_message/`,
      values // Use plain object if no file uploads are involved
    );
    message.success("Your message has been recorded successfully.");
    return true;
  } catch (error) {
    console.error(error);
    message.error(
      error.response?.data?.message || "An unknown error occurred."
    );
    return false;
  }
};

export const API_GET_ALL_MESSAGES = async () => {
    try {
        const response = await axios.get(`${DOMAIN_NAME}/message/get_all_messages/`);
        // message.success(response?.data?.message || "Messages fetched successfully");
        console.log(response.data)
        return response.data; // Return data instead of response object
    } catch (error) {
        console.error(error);
        message.error(error.response?.data?.message || "An unknown error occurred.");
        return false;
    }
};

// Function to delete a message
export const API_DELETE_MESSAGE = async (message_id) => {
    try {
        const response = await axios.delete(`${DOMAIN_NAME}/message/delete_message/`, {
            params: { message_id }, // Use params for GET request
          });
        message.success(response?.data?.message || "Message deleted successfully");
        return true;
    } catch (error) {
        console.error(error);
        message.error(error.response?.data?.message || "An unknown error occurred.");
        return false;
    }
};

// Function to delete a message
export const API_UPDATE_MESSAGE = async (message_id) => {
  
    try {
        const response = await axios.put(`${DOMAIN_NAME}/message/update_message/`, message_id);
        message.success(response?.data?.message || "Message deleted successfully");
        return true;
    } catch (error) {
        console.error(error);
        message.error(error.response?.data?.message || "An unknown error occurred.");
        return false;
    }
};
