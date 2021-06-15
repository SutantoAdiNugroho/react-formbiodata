import { axiosReportsUsers } from "../../helpers/axios";
import { verify } from "../../helpers/verify";
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

export const login = (params, history) => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  return axiosReportsUsers()
    .post("auth/user/login", params)
    .then((response) => {
      dispatch({ type: HIDE_LOADER });
      swal
        .fire("Login berhasil", "", "success")
        .then(async (res) => {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.token)
          );
        })
        .then((res) => {
          if (params.role === "admin") {
            dispatch(dashboard());
            history.push("/admin/dashboard");
          } else {
            dispatch(dashboardTch());
            history.push("/teacher/dashboard");
          }
        });
    })
    .catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            swal.fire("Email tidak ditemukan", "", "error");
            break;
          case 401:
            swal.fire("Password salah", "", "error");
            break;

          default:
            swal.fire("Login gagal, silahkan coba kembali", "", "error");
            break;
        }
      } else {
        swal.fire("Login gagal, silahkan coba kembali", "", "error");
      }
      var errorData = { data: {}, message: error };

      dispatch({ type: HIDE_LOADER });
      dispatch({ type: ERROR_AUTH, payload: errorData });
    });
};

export const register = (params, history) => (dispatch) => {
  const typeName = params.role === "teacher" ? "guru" : "siswa";
  dispatch({ type: SHOW_LOADER });
  return axiosReportsUsers()
    .post("auth/user/regist", params)
    .then((response) => {
      dispatch({ type: HIDE_LOADER });
      alert(`Pembuatan akun ${typeName} berhasil`);
      dispatch(dashboard());

      return RESP_SUCCESS;
    })
    .catch((error) => {
      console.log("error occured", error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert("Email telah digunakan");
            break;

          default:
            alert("Gagal mengambil data, silahkan coba kembali");
            break;
        }
      } else {
        alert("Gagal mengambil data, silahkan coba kembali");
      }
      dispatch({ type: ERROR_AUTH, payload: error });

      return RESP_ERROR;
    });
};

export const dashboard = () => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  return axiosReportsUsers()
    .get("users/admin/dash")
    .then((response) => {
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: LOGIN, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
      alert("Gagal mengambil data, silahkan coba kembali");
      var errorData = { data: {}, message: error };

      dispatch({ type: HIDE_LOADER });
      dispatch({ type: ERROR_AUTH, payload: errorData });
    });
};

export const dashboardTch = () => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  return axiosReportsUsers()
    .get(`users/teacher/dash?teacherId=${verify()._id}`)
    .then((response) => {
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: LOGIN, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
      alert("Gagal mengambil data, silahkan coba kembali");
      var errorData = { data: {}, message: error };

      dispatch({ type: HIDE_LOADER });
      dispatch({ type: ERROR_AUTH, payload: errorData });
    });
};
