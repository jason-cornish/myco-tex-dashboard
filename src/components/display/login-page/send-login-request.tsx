import { FormStateType } from "./login-page";
import axios from "axios";

export const sendLoginRequest = async (
  formState: FormStateType,
  APIURL: string
) => {
  const options = {
    url: "http://localhost:3001/api/user/login",
    method: "POST",
    data: {
      user_email: formState.email.value,
      user_pass: formState.password.value,
    },
    widthCredentials: true,
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
      return { error: error.status, message: error.data };
    });
  return res;
};
