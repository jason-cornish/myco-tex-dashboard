import { FormStateType } from "./login-page";
import axios from "axios";

export const sendLoginRequest = async (
  formState: FormStateType,
  APIURL: string
) => {
  const options = {
    url: "https://mycology.perenne.com/api/user/login",
    method: "POST",
    data: {
      user_email: formState.email.value,
      user_pass: formState.password.value,
    },
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const res = await axios(options)
    .then((res) => {
      console.log(res);

      return {
        token: res.headers["x-access-token"],
        user_id: res.data["user_id"],
      };
    })
    .catch((error) => {
      console.log(error);
      return { error: error.status, message: error.data };
    });
  return res;
};
