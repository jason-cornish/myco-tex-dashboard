import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import { DropdownOption } from "../types";
import { useContext, useMemo, useState } from "react";

import { DataContext } from "../../../../App";
import { HomeContext } from "../home";
import { useFetch } from "../../../../hooks/useFetch";
import useDataParser from "../../../../hooks/useDataParser";
import ChartWrapper from "../../../../reusable/chart-wrapper";

const HistoricalSection = () => {
  const { userProfile, APIURL } = useContext(DataContext);
  const { availableTabs } = useContext(HomeContext);

  const fetchOptions = useMemo(() => {
    return {
      axiosOptions: {
        url: `${APIURL}/api/measure/${availableTabs.Steamer.room_id}/true`,
        method: "GET",
        headers: {
          "x-access-token": userProfile.authToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
      timeInterval: false,
    };
  }, [APIURL, userProfile.authToken, availableTabs]);

  const {
    data: historicalData,
    dataError: historicalDataError,
    dataLoading: historicalDataLoading,
  } = useFetch(fetchOptions.axiosOptions, fetchOptions.timeInterval);

  const parseOptions = useMemo(() => {
    return { includeHistorical: true, probeTypesToInclude: ["therm"] };
  }, []);

  const { parsedData } = useDataParser(
    historicalData,
    historicalDataError,
    historicalDataLoading,
    parseOptions
  );
  console.log(parsedData);
  return (
    <SectionWrapper>
      {Object.keys(parsedData).length > 0 ? (
        Object.keys(parsedData).map((probeType) => {
          return <ChartWrapper data={parsedData[probeType]} />;
        })
      ) : (
        <div />
      )}
    </SectionWrapper>
  );
};

export default HistoricalSection;

const SectionWrapper = styled(ColumnWrapper)`
  row-gap: 10px;
`;
