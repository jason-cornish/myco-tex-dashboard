import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import { useContext, useMemo } from "react";
import { HomeContext } from "../home";
import { DataContext } from "../../../../App";
import { useTimer } from "../../../../hooks/useTimer";
import { useFetch } from "../../../../hooks/useFetch";
import LiveConection from "../live-connection";
import IncubatorBlueprint from "./incubator-blueprint";
import { getMeasurementFromRawData } from "../helper-functions/getMeasurementsFromRawData";

const SteamerLive = () => {
  const { userProfile, APIURL } = useContext(DataContext);
  const { availableTabs, fetchFromAPI, reportDataAvailable } =
    useContext(HomeContext);

  const time = useTimer(1000);

  const options = useMemo(() => {
    console.log(availableTabs);
    return {
      liveOptions: {
        url: `${APIURL}/api/measure/${availableTabs.Incubation.room_id}/false`,
        method: "GET",
        headers: {
          "x-access-token": userProfile.authToken,
          "Content-Type": "application/json",
        },
      },
    };
  }, [APIURL, userProfile.authToken, availableTabs]);

  const {
    data: liveData,
    dataError: liveDataError,
    dataLoading: liveDataLoading,
  } = useFetch(options.liveOptions, time);

  const parsedLiveData = useMemo(() => {
    let response: any = { temp: false };
    if (!liveDataLoading && !liveDataError) {
      response = getMeasurementFromRawData(liveData, {
        probeTypes: ["temp"],
        includeHistorical: false,
      });
    }
    return response;
  }, [liveData, liveDataLoading, liveDataError]);

  const hasLiveConnection = useMemo(() => {
    let mostRecentDate = 0;
    Object.keys(parsedLiveData).forEach((probe, i) => {
      //   console.log(parsedLiveData[probe]);
      if (
        !parsedLiveData[probe].hasOwnProperty("measure") ||
        !parsedLiveData[probe].hasOwnProperty("measure_created_at")
      ) {
        return;
      }
      if (i === 0) {
        mostRecentDate = parsedLiveData[probe]["measure_created_at"] * 1000;
        return;
      }
      if (mostRecentDate > parsedLiveData[probe]["measure_created_at"]) {
        mostRecentDate = parsedLiveData[probe]["measure_created_at"] * 1000;
      }
    });
    const secondDifference = time - mostRecentDate;
    if (mostRecentDate >= time || secondDifference <= 2000) return true;
    return false;
  }, [parsedLiveData, time]);

  return (
    <SectionWrapper>
      <SectionTitleWrapper>
        <SectionTitle>Live Steamer Data</SectionTitle>
        <LiveConection hasLiveConnection={hasLiveConnection} />
      </SectionTitleWrapper>
      <IncubatorBlueprint liveData={parsedLiveData} />
    </SectionWrapper>
  );
};

export default SteamerLive;

const SectionTitleWrapper = styled(RowWrapper)`
  column-gap: 10px;
  align-items: center;
  position: relative;
`;

const SectionTitle = styled.h1`
  font-size: 24px !important;
  color: ${(props) => props.theme.colors.grey} !important;
`;

const SectionWrapper = styled(ColumnWrapper)`
  row-gap: 10px;
`;
