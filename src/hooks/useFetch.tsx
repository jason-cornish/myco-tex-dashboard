import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { HomeContext } from "../components/display/home/home";
import { DataContext } from "../App";
import { request } from "http";

export const useFetch = (options: any, timer: number | boolean) => {
  const { userProfile, storeRefreshedToken, invalidateSession } =
    useContext(DataContext);
  const { availableTabs, reportDataAvailable } = useContext(HomeContext);
  const [data, setData] = useState({});
  const [dataError, setDataError] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const fetch = useCallback(async () => {
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
        return res;
      })
      .catch((error) => {
        return error;
      });
    return res;
  }, [options]);

  const handleExpiredToken = useCallback(
    async (res: any) => {
      storeRefreshedToken(res.headers["x-access-token"]);
      const resUsingNewToken = await fetch();
      console.log(resUsingNewToken);
      // }
      // } else {
      //   resUsingNewToken = {
      //     response: { data: "Access Denied. No refresh token provided." },
      //     status: 401,
      //   };
      //   invalidateSession("all");
      // }
      return resUsingNewToken;
    },
    [fetch, invalidateSession, storeRefreshedToken]
  );

  useEffect(() => {
    (async () => {
      if (!reportDataAvailable || !userProfile.authToken) {
        return;
      }
      let res = await fetch();
      if (res.hasOwnProperty("data")) {
        if (res.data === "Token Expired: New token returned in header") {
          res = await handleExpiredToken(res);
        }
      }

      // console.log(res);
    })();
  }, [
    availableTabs,
    options,
    reportDataAvailable,
    userProfile,
    timer,
    fetch,
    handleExpiredToken,
  ]);

  return { data, dataError, dataLoading };
};
