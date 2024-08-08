import axios from "axios";
import { message } from "antd";
import { DOMAIN_NAME } from "../values/Domain";
import { CONVERT_TO_KEBAB_CASE } from "../utils/Important_functions";

export const API_CREATE_PRODUCT = async (values) => {
  const updatedValues = { ...values };
  console.log(values)
  if (updatedValues.product_price_old) {
    updatedValues.on_sale = true;
  } else {
    updatedValues.on_sale = false;
  }

  const formData = new FormData();

  // Append non-file fields to formDataa
  Object.keys(updatedValues).forEach((key) => {
    if (key === "images_url") {
      // Append each file object in images_url
      updatedValues[key].forEach((file) => {
        formData.append("images_url", file.originFileObj);
      });
    } else if (key === "sizes_available") {
      // Append each size string to formData
      updatedValues[key].forEach((size) => {
        formData.append("sizes_available", size);
      });
    } else {
      const value =
        key === "product_type"
          ? CONVERT_TO_KEBAB_CASE(updatedValues[key])
          : updatedValues[key];
      formData.append(key, value);
    }
  });

  formData.append("product_url", `/${updatedValues.product_type}`);
  // Log FormData entries
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/product/create_product/`,
      formData
    );
    message.success(response?.data?.message || "Product created successfully");
    return true;
  } catch (error) {
    console.error(error);
    message.error(
      error.response?.data?.message || "An unknown error occurred."
    );
    return false;
  }
};

export const API_GET_PRODUCTS_BY_TYPE = async (product_type) => {
    console.log(product_type)
  try {
    let response = "";
    if (product_type == "rugs") {
      response = await axios.get(`${DOMAIN_NAME}/product/get_all_products/`);
    } else {
      response = await axios.get(`${DOMAIN_NAME}/product/get_products_by_type/`,{
          params: { product_type }, // Use params for GET request
        }
      );
    }
    // message.success(response?.data?.message || "Products Fetched successfully");
    return response;
  } catch (error) {
    console.error(error);
    message.error(
      error.response?.data?.message || "An unknown error occurred."
    );
    return false;
  }
};
export const API_GET_RANDOM_PRODUCTS= async (limit) => {
  try {
    const response = await axios.get(`${DOMAIN_NAME}/product/get_random_products/`, {
      params: {
          limit:limit
        }
    });
    // message.success(response?.data?.message || "Products Fetched successfully");
    return response;
  } catch (error) {
    console.error(error);
    message.error(
      error.response?.data?.message || "An unknown error occurred."
    );
    return false;
  }
};

export const API_GET_PRODUCT = async (product_id) => {
  console.log("HELLO", product_id);
  try {
    const response = await axios.get(`${DOMAIN_NAME}/product/get_product/`, {
      params: { product_id }, // Use params for GET request
    });
    console.log(response);
    // message.success(response?.data?.message || "Products Fetched successfully");
    return response;
  } catch (error) {
    console.error(error);
    message.error(
      error.response?.data?.message || "An unknown error occurred."
    );
    return false;
  }
};


export const API_GET_PRODUCTS_BY_SIZE = async (size) => {
    console.log("SIZE____",size)
        try {
          const response = await axios.get(`${DOMAIN_NAME}/product/get_products_by_size/`, {
            params: {
                size:size
              }
          });
        //   message.success(response?.data?.message || "Products Fetched successfully");
          return response;
        } catch (error) {
          console.error(error);
          message.error(
            error.response?.data?.message || "An unknown error occurred."
          );
          return false;
        }
      };


export const API_GET_PRODUCTS_BY_NAME = async (searchInput,limit) => {
console.log(limit)
    try {
      const response = await axios.get(`${DOMAIN_NAME}/product/get_products_by_name/`, {
        
        params: {
            product_name: searchInput,
            limit:limit
          }
      });
    //   message.success(response?.data?.message || "Products Fetched successfully");
      return response;
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "An unknown error occurred."
      );
      return false;
    }
  };

export const API_DELETE_PRODUCT = async (product_id) => {
    console.log(product_id)
    
    try {
      const response = await axios.delete(`${DOMAIN_NAME}/product/delete_product/`, {
        params: { product_id }, // Use params for GET request
      });
      console.log(response);
      message.success(response?.data?.message || "Products Deleted successfully");
      return response;
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "An unknown error occurred."
      );
      return false;
    }
  };
  export const API_UPDATE_PRODUCT = async (productDetails) => {
    console.log('productDetails',productDetails)
    if (productDetails.product_price_old) {
        productDetails.on_sale = true;
    } else {
        productDetails.on_sale = false;
    }

    const formData = new FormData();

    // Append non-file fields to formDataa
    Object.keys(productDetails).forEach((key) => {
      if (key === "sizes_available") {
        // Append each size string to formData
        productDetails[key].forEach((size) => {
          formData.append("sizes_available", size);
        });
      } else {
        const value =
          key === "product_type"
            ? CONVERT_TO_KEBAB_CASE(productDetails[key])
            : productDetails[key];
        formData.append(key, value);
      }
    });
    
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
    try {
      const response = await axios.put(`${DOMAIN_NAME}/product/update_product/`, formData);
      console.log(response);
      message.success(response?.data?.message || "Product updated successfully");
      return response;
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "An unknown error occurred.");
      return false;
    }
  };
  