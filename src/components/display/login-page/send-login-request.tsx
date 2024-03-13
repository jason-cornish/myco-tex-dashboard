import { FormStateType } from "./login-page";
import axios from "axios";

export const sendLoginRequest = async (
  formState: FormStateType,
  APIURL: string
) => {
  const options = {
    url: "https://mycotex.benballard.dev/api/user/login",
    // url: "http://localhost:3001/api/user/login",
    method: "POST",
    data: {
      user_email: formState.email.value,
      user_pass: formState.password.value,
    },
    headers: {
      "Access-Control-Allow-Origin": "https://myco-tex.web.app/",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const res = await axios(options)
    .then((res) => {
      console.log(res);

      return {
        status: res.status,
        token: res.headers["x-access-token"],
        user_id: res.data["user_id"],
      };
    })
    .catch((error) => {
      console.log(error);
      return { status: error.response.status, message: error.response.data };
    });
  return res;
};
