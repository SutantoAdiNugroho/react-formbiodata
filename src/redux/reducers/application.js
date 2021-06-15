import {
  HIDE_LOADER,
  SHOW_LOADER,
  LOGIN,
  REGISTER_USER,
  DASHBOARD,
  ERROR_AUTH,
} from "../actions/application";

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: [],
  errData: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_LOADER:
      return { ...state, loading: true };

    case HIDE_LOADER:
      return { ...state, loading: false };

    case LOGIN:
      return { ...state, user: payload, isLoggedIn: true };

    case DASHBOARD:
      return { ...state, user: payload, isLoggedIn: true };

    case REGISTER_USER:
      return { ...state, user: payload, isLoggedIn: true };

    case ERROR_AUTH:
      return {
        ...state,
        errData: payload,
        loading: false,
      };

    default:
      return state;
  }
};
