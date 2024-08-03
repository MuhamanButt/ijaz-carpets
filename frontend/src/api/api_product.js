import axios from "axios";
import { message } from "antd";
import { DOMAIN_NAME } from "../values/Domain";

export const API_CREATE_PRODUCT = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`${DOMAIN_NAME}/product/create_product/`, data);
        message.success(response?.data?.message || "Product created successfully");
        return true;
    } catch (error) {
        console.error(error);
        message.error(error.response?.data?.message || "An unknown error occurred.");
        return false;
    }
};
