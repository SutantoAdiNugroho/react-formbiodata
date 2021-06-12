import { axiosReportsUsers } from "../../helpers/axios";

export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";
export const LOGIN = "LOGIN";
export const ERROR_AUTH = "ERROR_AUTH";

export const showLoader = () => (dispatch) => {
  dispatch({
    type: SHOW_LOADER,
  });
};

export const hideLoader = () => (dispatch) => {
  dispatch({
    type: HIDE_LOADER,
  });
};

export const login = (params, history) => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  return axiosReportsUsers()
    .post("auth/user/login", params)
    .then((response) => {
      console.log(response);
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: LOGIN, payload: res.data });
      alert("login berhasil");
    })
    .catch((error) => {
      var errorData = { data: {}, message: error };
      alert("login gagal");

      dispatch({ type: HIDE_LOADER });
      dispatch({ type: ERROR_AUTH, payload: errorData });
    });
};
