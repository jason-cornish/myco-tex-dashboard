import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import MixerBlueprint from "./mixer-blueprint";
import { useContext, useEffect, useMemo, useState } from "react";
import { MixerDataType } from "./types";
import LiveConection from "../live-connection";
import { HomeContext } from "../home";
import { DataContext } from "../../../../App";
import { useTimer } from "../../../../hooks/useTimer";

type LiveHumidityType = {
  lastUpdated: number;
  value: number;
};

const MixerPage = () => {
  const { userProfile, APIURL } = useContext(DataContext);
  const { availableTabs, fetchFromAPI, reportDataAvailable } =
    useContext(HomeContext);
  const [liveHumidity, setLiveHumidity] = useState<LiveHumidityType>({
    lastUpdated: 0,
    value: 0,
  });
  const time = useTimer(1000);
  const mixerData: MixerDataType = useMemo(() => {
    return {
      humidity: 10,
    };
  }, []);

  const hasLiveConnection = useMemo(() => {
    if (!liveHumidity.lastUpdated || !liveHumidity.value) return false;
    console.log(time, liveHumidity.lastUpdated);
    const secondDifference = time - liveHumidity.lastUpdated;
    console.log(secondDifference);
    if (liveHumidity.lastUpdated >= time || secondDifference <= 2000)
      return true;
    return false;
  }, [liveHumidity, time]);

  // const liveTemperature = useMemo(async () => {

  //   let liveTemperatureValue = false
  //   try {
  //     liveTemperatureValue = res.controllers[0].probes[0].measurements[0]
  //   } catch {
  //     liveTemperatureValue = false
  //   }
  //   return liveTemperatureValue
  // }, [
  //   availableTabs,
  //   APIURL,
  //   fetchFromAPI,
  //   userProfile.authToken,
  //   reportDataAvailable,
  // ]);

  useEffect(() => {
    (async () => {
      if (
        !availableTabs.hasOwnProperty("Mixer") ||
        !reportDataAvailable ||
        !userProfile.authToken
      ) {
        return;
      }

      const options = {
        url: `${APIURL}/api/measure/${availableTabs.Mixer.room_id}/false`,
        method: "GET",
        headers: {
          "x-access-token": userProfile.authToken,
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      };

      const res = await fetchFromAPI(options);
      let liveTemperatureResponse: any = false;
      try {
        liveTemperatureResponse = res.controllers[0].probes[0].measurements[0];
      } catch {
        liveTemperatureResponse = false;
      }
      if (!liveTemperatureResponse) return;
      setLiveHumidity({
        value: liveTemperatureResponse.measure,
        lastUpdated: liveTemperatureResponse["measure_created_at"] * 1000,
      });
    })();
  }, [
    APIURL,
    availableTabs,
    fetchFromAPI,
    reportDataAvailable,
    userProfile.authToken,
    time,
  ]);

  return (
    <MixerPageWrapper>
      <SectionTitleWrapper>
        <SectionTitle>Live Mixer Data</SectionTitle>
        <LiveConection hasLiveConnection={hasLiveConnection} />
      </SectionTitleWrapper>
      <MixerBlueprint data={{ humidity: liveHumidity.value }} />
    </MixerPageWrapper>
  );
};

export default MixerPage;

const MixerPageWrapper = styled(ColumnWrapper)`
  row-gap: 10px;
`;

const SectionTitleWrapper = styled(RowWrapper)`
  column-gap: 10px;
  align-items: center;
`;

const SectionTitle = styled.h1`
  color: ${(props) => props.theme.colors.grey} !important;
`;
