import axios from "axios";
import {
  AUTH_PERFIL,
  CLEAR_ERRORS,
  ERROR_USER,
  LOGIN_USER,
  LOG_OUT_USER,
  REGISTRAR_USUARIO,
} from "../types/authTypes";

export const perfilDeUsuario = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`/api/users/my-perfil`);
      return dispatch({ type: AUTH_PERFIL, payload: data });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          return {
            errorAuth: true,
          };
        }
      }
      // dispatch({
      //   type: AUTH_PERFIL,
      //   payload: { msgErr: true, errorMsg: err.response.data.msg },
      // });
      return { msgErr: true, errorMsg: err.response };
    }
  };
};

export const logearUsuario = (values) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`/api/users/login`, values, {
        withCredentials: true,
      });
      localStorage.setItem("userLogin", JSON.stringify(data));
      return dispatch({ type: LOGIN_USER, payload: data });
    } catch (error) {
      const errorData = { msgErr: true, errorMsg: error.response.data };
      dispatch({ type: ERROR_USER, payload: errorData });
      return dispatch({ type: AUTH_PERFIL, payload: errorData });
    }
  };
};

// 60 * 60 * 24 * 30 = 2592000

export const registrarUsuario = (user) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`/api/users`, user);
      console.log(data);

      // setCookieAuth(data.token);

      return dispatch({ type: REGISTRAR_USUARIO, payload: data });
    } catch (err) {
      dispatch({
        type: ERROR_USER,
        payload: { error: true, errorMsg: err.response.data.msg },
      });
      return { error: true, errorMsg: err.response.data };
    }
  };
};

export const logOutUser = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`/api/users/logout`);
      console.log(data);
      return dispatch({
        type: LOG_OUT_USER,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
