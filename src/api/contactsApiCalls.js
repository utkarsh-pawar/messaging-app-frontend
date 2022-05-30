import axios from "axios";
import { config } from "../config/config";
import { loadingActions } from "../store/loadingSlice";

export const getContacts = async () => {
  try {
    const authHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios.get(`${config.base_url}/contact/`, {
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

export const getContact = async (id) => {
  try {
    const authHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios.get(`${config.base_url}/contact/${id}`, {
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

export const addContact = async (data, dispatch) => {
  try {
    dispatch(loadingActions.startLoading());
    console.log(data);
    const authHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios.post(`${config.base_url}/contact/add`, data, {
      headers: {
        authorization: authHeader,
      },
    });
    dispatch(loadingActions.stopLoading());
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
