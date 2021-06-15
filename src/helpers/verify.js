import jwt from "jwt-decode";

export const verify = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded;

  try {
    decoded = jwt(token);
  } catch (error) {
    console.log(error);
    decoded = "nothing";
  }

  return decoded;
};
