import {
  HIDE_LOADER,
  SHOW_LOADER,
  LOGIN,
  ERROR_AUTH,
} from "../actions/application";

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_LOADER:
      return { ...state, loading: true };

    case HIDE_LOADER:
      return { ...state, loading: false };

    case LOGIN:
      return { user: payload, isLoggedIn: true };

    case ERROR_AUTH:
      return {
        ...state,
        user: payload,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
