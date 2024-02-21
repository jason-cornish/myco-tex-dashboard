import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { HomeContext } from "../components/display/home/home";
import { DataContext } from "../App";
import { request } from "http";

export const useFetch = (options: any, timer: number | boolean) => {
  const { userProfile, storeRefreshedToken, invalidateSession } =
    useContext(DataContext);
  const { availableTabs } = useContext(HomeContext);
  const [data, setData] = useState({ data: false });
  const [dataError, setDataError] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const fetch = useCallback(async (options: any) => {
    // if (fetchCounter > 3) {
    //   invalidateSession("all");
    //   return {
    //     response: { data: "Access Denied. No refresh token provided." },
    //     status: 401,
    //   };
    // }
    // console.log(options.headers["x-access-token"]);
    // console.log(options.headers);
    let res: any = await axios(options)
      .then((res) => {
        // console.log(res);
        setDataError(false);
        return res;
      })
      .catch((error) => {
        // console.log(error);
        setDataError(true);
        return error;
      });
    return res;
  }, []);

  const handleExpiredToken = useCallback(
    async (res: any) => {
      storeRefreshedToken(res.headers["x-access-token"]);
      const newOptions = { ...options };
      newOptions.headers["x-access-token"] = res.headers["x-access-token"];
      let resUsingNewToken: any = await fetch(newOptions);

      if (resUsingNewToken.status !== 200) {
        resUsingNewToken = {
          response: { data: "Access Denied. No refresh token provided." },
          status: 401,
        };
        invalidateSession("all");
      }

      return resUsingNewToken;
    },
    [fetch, storeRefreshedToken, options, invalidateSession]
  );

  useEffect(() => {
    (async () => {
      if (!userProfile.authToken) {
        return;
      }
      setDataLoading(true);
      let res = await fetch(options);

      if (res.hasOwnProperty("data")) {
        if (res.data === "Token Expired: New token returned in header") {
          res = await handleExpiredToken(res);
        }
      }
      setDataLoading(false);
      setData(res);
    })();
  }, [options, userProfile, timer, fetch, handleExpiredToken]);

  return { data, dataError, dataLoading };
};
