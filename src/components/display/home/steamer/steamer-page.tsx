import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import {
  DropdownOption,
  HistoricalDataType,
  LiveSteamerDataType,
} from "../types";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import SteamerBlueprint from "./steamer-blueprint";
import LiveConection from "../live-connection";
import Button from "../../../../reusable/button";
import TemperatureTimeChart from "../charts/temps-over-time/temp-time-chart";
import Dropdown from "../../../../reusable/dropdown";
import SteamerLive from "./steamer-live";
import { DataContext } from "../../../../App";
import { HomeContext } from "../home";
import { useFetch } from "../../../../hooks/useFetch";
import { getMeasurementFromRawData } from "../helper-functions/getMeasurementsFromRawData";

const SteamerPage = () => {
  const { userProfile, APIURL } = useContext(DataContext);
  const { availableTabs, fetchFromAPI, reportDataAvailable } =
    useContext(HomeContext);
  const [historicalTimeRange, setHistoricalTimeRange] =
    useState<string>("24 hours");

  const handleClickOption: any = (value: string, stateName?: string) => {
    setHistoricalTimeRange(value);
  };

  const dropdownOptions: DropdownOption[] = [
    {
      option: "24 hours",
      onClick: () => handleClickOption("24 hours"),
      icon: false,
    },
    {
      option: "7 days",
      onClick: () => handleClickOption("7 days"),
      icon: false,
    },
    {
      option: "30 days",
      onClick: () => handleClickOption("30 days"),
      icon: false,
    },
    {
      option: "90 days",
      onClick: () => handleClickOption("90 days"),
      icon: false,
    },
  ];

  const options = useMemo(() => {
    return {
      url: `${APIURL}/api/measure/${availableTabs.Steamer.room_id}/true`,
      method: "GET",
      headers: {
        "x-access-token": userProfile.authToken,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
  }, [APIURL, userProfile.authToken, availableTabs]);

  const {
    data: historicalData,
    dataError: historicalDataError,
    dataLoading: historicalDataLoading,
  } = useFetch(options, false);

  // const chartOptions = useMemo(() => {
  //   const returnValue = {
  //     options: { yAxisType: "temp" },
  //     data: [],
  //   };
  //   if (
  //     !historicalDataLoading &&
  //     !historicalDataError &&
  //     historicalData.hasOwnProperty("data")
  //   ) {
  //     const parsedData = getMeasurementFromRawData(historicalData.data, {
  //       includeHistorical: true,
  //       probeTypes: ["temp"],
  //     });
  //     returnValue.data = parsedData;
  //   }
  //   return returnValue;
  // }, [historicalData, historicalDataError, historicalDataLoading]);

  return (
    <SteamerPageWrapper>
      <SteamerLive />
      {/* <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>Live Steamer Data</SectionTitle>
          <LiveConection hasLiveConnection={hasLiveConnection} />
        </SectionTitleWrapper>
        <SteamerBlueprint liveData={liveSteamerData} />
      </SectionWrapper> */}

      {/* <Button
        type="fancy"
        text="Configure new sensor"
        icon={false}
        color={false}
        onClick={() => {}}
      /> */}

      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>Temperatures Over Time</SectionTitle>
          <Dropdown
            options={dropdownOptions}
            selectedOption={historicalTimeRange}
          />
        </SectionTitleWrapper>
        <ChartWrapper>
          {/* <TemperatureTimeChart chartOptions={chartOptions} /> */}
        </ChartWrapper>
      </SectionWrapper>
    </SteamerPageWrapper>
  );
};

export default SteamerPage;

const SteamerPageWrapper = styled(ColumnWrapper)`
  row-gap: 25px;
`;

const ChartWrapper = styled(ColumnWrapper)`
  padding-top: 10px;
  margin-left: -10px;
`;

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
