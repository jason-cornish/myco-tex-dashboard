import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import { LiveLabDataType } from "./types";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import LabBlueprint from "./lab-blueprint";
import LiveConection from "../live-connection";
import { HistoricalDataType, LiveReadingType } from "../types";
import TemperatureTimeChart from "../charts/temps-over-time/temp-time-chart";
import { useTimer } from "../../../../hooks/useTimer";
import { HomeContext } from "../home";
import { DataContext } from "../../../../App";
import { useFetch } from "../../../../hooks/useFetch";
import { getMeasurementFromRawData } from "../helper-functions/getMeasurementsFromRawData";

const LabPage = () => {
  const { userProfile, APIURL } = useContext(DataContext);
  const { availableTabs, fetchFromAPI, reportDataAvailable } =
    useContext(HomeContext);

  const [liveTemperature, setLiveTemperature] = useState<LiveReadingType>({
    lastUpdated: 0,
    value: 0,
  });

  const time = useTimer(1000);

  const hasLiveConnection = useMemo(() => {
    if (!liveTemperature.lastUpdated || !liveTemperature.value) return false;
    const secondDifference = time - liveTemperature.lastUpdated;
    if (liveTemperature.lastUpdated >= time || secondDifference <= 2000)
      return true;
    return false;
  }, [liveTemperature, time]);

  const options = useMemo(() => {
    return {
      liveOptions: {
        url: `${APIURL}/api/measure/${availableTabs.Lab.room_id}/false`,
        method: "GET",
        headers: {
          "x-access-token": userProfile.authToken,
          "Content-Type": "application/json",
        },
      },
      historicalOptions: {
        url: `${APIURL}/api/measure/${availableTabs.Lab.room_id}/true`,
        method: "GET",
        headers: {
          "x-access-token": userProfile.authToken,
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      },
    };
  }, [APIURL, userProfile.authToken, availableTabs]);

  const {
    data: liveData,
    dataError: liveDataError,
    dataLoading: liveDataLoading,
  } = useFetch(options.liveOptions, false);

  // const parsedLiveData = useMemo(() => {
  //   let response = { ppm: false, temp: false };
  //   if (!liveDataLoading && !liveDataError) {
  //     response = getMeasurementFromRawData(liveData, {
  //       probeTypes: ["ppm", "temp"],
  //       includeHistorical: false,
  //     });
  //   }
  //   return response;
  // }, [liveData, liveDataLoading, liveDataError]);

  const {
    data: historicalData,
    dataError: historicalDataError,
    dataLoading: historicalDataLoading,
  } = useFetch(options.historicalOptions, false);

  // const parsedHistoricalData = useMemo(() => {
  //   let response = { ppm: false };
  //   if (!historicalDataLoading && !historicalDataError) {
  //     response = getMeasurementFromRawData(liveData, {
  //       probeTypes: ["ppm"],
  //       includeHistorical: true,
  //     });
  //     console.log(response);
  //   }
  //   return response;
  // }, [historicalData, historicalDataLoading, historicalDataError]);

  // const chartOptions = useMemo(() => {
  //   console.log(historicalData, historicalDataError, historicalDataLoading);
  //   const returnValue = {
  //     options: { yAxisType: "PPM" },
  //     data: [],
  //   };
  //   if (!historicalDataLoading && !historicalDataError) {
  //     const parsedData = getMeasurementFromRawData(historicalData, {
  //       includeHistorical: true,
  //       probeTypes: ["ppm"],
  //     });
  //     console.log(parsedData);
  //     returnValue.data = parsedData;
  //   }
  //   return returnValue;
  // }, [historicalData, historicalDataError, historicalDataLoading]);

  return (
    <LabPageWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>Live Lab Data</SectionTitle>
          {/* <LiveConection hasLiveConnection={hasLiveConnection} /> */}
        </SectionTitleWrapper>
        {/* <LabBlueprint liveData={parsedLiveData} /> */}
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>PPM Over Time</SectionTitle>
        </SectionTitleWrapper>
        <ChartWrapper>
          {/* <TemperatureTimeChart chartOptions={chartOptions} /> */}
        </ChartWrapper>
      </SectionWrapper>
    </LabPageWrapper>
  );
};

export default LabPage;

const LabPageWrapper = styled(ColumnWrapper)`
  row-gap: 25px;
`;

const ChartWrapper = styled(ColumnWrapper)`
  padding-top: 10px;
  margin-left: -10px;
`;

const SectionTitleWrapper = styled(RowWrapper)`
  column-gap: 10px;
  align-items: center;
`;

const SectionTitle = styled.h1`
  font-size: 24px !important;
  color: ${(props) => props.theme.colors.grey} !important;
`;

const SectionWrapper = styled(ColumnWrapper)`
  row-gap: 10px;
`;
