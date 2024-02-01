import { FormStateType } from "./sign-up-page";
import axios from "axios";

export const sendSignupRequest = async (
  formState: FormStateType,
  APIURL: string
) => {
  const options = {
    url: "http://localhost:3001/api/user/signup",
    method: "POST",
    widthCredentials: true,
    data: {
      user_email: formState.email.value,
      user_pass: formState.password.value,
      user_company_name: formState.companyName.value,
    },
  };
  const res = await axios(options)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      return { error: error.status, message: error.data };
    });
  console.log(res);
};
