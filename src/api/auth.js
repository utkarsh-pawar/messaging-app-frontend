import axios from "axios";
import { config } from "../config/config";
import { loadingActions } from "../store/loadingSlice";
import { userActions } from "../store/userSlice";

export const isUser = async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // console.log(token, user);
  if (token) {
    await dispatch(
      userActions.login({
        token: token,
        user: user,
      })
    );
  }
};

export const login = async (data, dispatch, toast) => {
  try {
    await dispatch(loadingActions.startLoading());
    const response = await axios.post(`${config.base_url}/user/login`, data);
    localStorage.setItem("user", {
      email: response.data.data.email,
      username: response.data.data.username,
    });
    localStorage.setItem("token", response.data.data.token);

    await dispatch(
      userActions.login({
        token: response.data.data.token,
        user: {
          email: response.data.data.email,
          username: response.data.data.username,
        },
      })
    );
    await dispatch(loadingActions.stopLoading());
  } catch (e) {
    await dispatch(loadingActions.stopLoading());
    if (e.response) {
      await toast({
        description: e.response.data.error,
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    } else if (e.request) {
      console.log(e.request.data);
    } else {
      console.log(e.message);
    }
  }
};

export const signup = async (data, dispatch, toast) => {
  try {
    await dispatch(loadingActions.startLoading());
    const signupResponse = await axios.post(
      `${config.base_url}/user/signup`,
      data
    );
    const response = await axios.post(`${config.base_url}/user/login`, data);
    console.log(response);
    localStorage.setItem("user", {
      email: response.data.data.email,
      username: response.data.data.username,
    });
    localStorage.setItem("token", response.data.data.token);

    await dispatch(
      userActions.login({
        token: response.data.data.token,
        user: {
          email: response.data.data.email,
          username: response.data.data.username,
        },
      })
    );
    await dispatch(loadingActions.stopLoading());
  } catch (e) {
    await dispatch(loadingActions.stopLoading());
    if (e.response) {
      await toast({
        description: e.response.data.error,
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    } else if (e.request) {
      console.log(e.request.data);
    } else {
      console.log(e.message);
    }
  }
};
