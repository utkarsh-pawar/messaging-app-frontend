import axios from "axios";
import { config } from "../config/config";
import { loadingActions } from "../store/loadingSlice";

export const getMessages = async () => {
  try {
    const authHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios.get(`${config.base_url}/message/`, {
      headers: {
        authorization: authHeader,
      },
    });
    return response.data.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request.data);
    } else {
      console.log(e.message);
    }
  }
};

export const sendOtp = async (contact_no, dispatch, toast) => {
  try {
    dispatch(loadingActions.startLoading());
    const authHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios.post(
      `${config.base_url}/message/otp`,
      { contact_no },
      {
        headers: {
          authorization: authHeader,
        },
      }
    );
    dispatch(loadingActions.stopLoading());
    await toast({
      description:
        "Otp sent Successfully. Please check messages section for the info.",
      status: "success",
      duration: 5000,
      isClosable: false,
    });
    return response.data.data;
  } catch (e) {
    dispatch(loadingActions.stopLoading());
    if (e.response) {
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request.data);
    } else {
      console.log(e.message);
    }
  }
};
export const sendMsg = async (contact_no, message, dispatch, toast) => {
  try {
    dispatch(loadingActions.startLoading());
    const authHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios.post(
      `${config.base_url}/message/send`,
      { contact_no, message },
      {
        headers: {
          authorization: authHeader,
        },
      }
    );
    dispatch(loadingActions.stopLoading());
    await toast({
      description:
        "Message sent Successfully. Please check messages section for the info.",
      status: "success",
      duration: 5000,
      isClosable: false,
    });
    return response.data.data;
  } catch (e) {
    dispatch(loadingActions.stopLoading());
    if (e.response) {
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request.data);
    } else {
      console.log(e.message);
    }
  }
};
