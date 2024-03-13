import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router";

const useDemoSession = () => {
  const navigate = useNavigate();

  const sendLoginRequest = useCallback(
    async (setState: any) => {
      const options = {
        url: "https://mycotex.benballard.dev/api/user/login",
        // url: "http://localhost:3001/api/user/login",
        method: "POST",
        data: {
          user_email: "test@test.com",
          user_pass: "password",
        },
        headers: {
          "Access-Control-Allow-Origin": "https://myco-tex.web.app/",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const res: any = await axios(options)
        .then((res) => {
          return {
            status: res.status,
            token: res.headers["x-access-token"],
            user_id: res.data["user_id"],
          };
        })
        .catch((error) => {
          return {
            status: error.response.status,
            message: error.response.data,
          };
        });
      console.log(res);
      if (res.status === 200) {
        setState({
          email: "test@test.com",
          name: "Demo User",
          userID: res.user_id,
          authToken: res.token,
        });
        navigate("/home");
      }
    },
    [navigate]
  );

  return { sendLoginRequest };
};

export default useDemoSession;
