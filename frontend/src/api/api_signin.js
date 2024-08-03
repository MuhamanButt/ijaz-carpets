import axios from "axios";
import { message } from "antd";
import { DOMAIN_NAME } from "../values/Domain";

export const API_SIGNIN = async (email, password) => {
    try {
      const response = await axios.post(`${DOMAIN_NAME}/authentication/log_in/`, {
        email: email,
        password: password,
      });
      message.success(response?.data?.message || "Login successful");
      return true;
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "An unknown error occurred."
      );
      return false;
    }
  };

// export const API_SIGNIN = async()=>{
//     try{

//     }
//     catch (error) {
//         message.error(error.response?.data?.message || "An unknown error occurred.");
//       } finally {
//         setShowSpinner(false);
//     }
// }
