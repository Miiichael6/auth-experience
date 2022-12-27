import {
  AUTH_PERFIL,
  REGISTRAR_USUARIO,
  LOGIN_USER,
  LOG_OUT_USER,
  ERROR_USER,
  CLEAR_ERRORS,
} from "../types/authTypes";

const authState = {
  user: {},
  error: {},
};

const authReducer = (state = authState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    case AUTH_PERFIL:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTRAR_USUARIO:
      // localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload,
      };

    case LOG_OUT_USER:
      return {
        ...state,
        user: {},
      };

    case ERROR_USER:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: {}
      }

    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
