import { axiosReportsUsers } from "../../helpers/axios";
import swal from "sweetalert2";

export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";
export const LOGIN = "LOGIN";
export const REGISTER_USER = "REGISTER_USER";
export const DASHBOARD = "DASHBOARD";
export const ERROR_AUTH = "ERROR_AUTH";

export const RESP_SUCCESS = "00";
export const RESP_ERROR = "99";

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

export const postBio = (params, history) => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  return axiosReportsUsers()
    .post("form/postbio", params)
    .then((response) => {
      dispatch({ type: HIDE_LOADER });
      swal.fire("Berhasil mengirim data", "", "success");
      return RESP_SUCCESS;
    })
    .catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            swal.fire(
              "Email sudah digunakan, silahkan gunakan email lainnya",
              "",
              "error"
            );
            break;

          default:
            swal.fire(
              "Gagal mengirim data, silahkan coba kembali",
              "",
              "error"
            );
            break;
        }
      } else {
        swal.fire("Gagal mengirim data, silahkan coba kembali", "", "error");
      }
      var errorData = { data: {}, message: error };

      dispatch({ type: HIDE_LOADER });
      dispatch({ type: ERROR_AUTH, payload: errorData });
      return RESP_ERROR;
    });
};
