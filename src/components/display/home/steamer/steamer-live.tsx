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
import SteamerBlueprint from "./steamer-blueprint";
import useDataParser from "../../../../hooks/useDataParser";

const SteamerLive = () => {
  const { userProfile, APIURL } = useContext(DataContext);
  const { availableTabs } = useContext(HomeContext);

  const time = useTimer(1000);

  const options = useMemo(() => {
    return {
      url: `${APIURL}/api/measure/${availableTabs.Steamer.room_id}/false`,
      method: "GET",
      headers: {
        "x-access-token": userProfile.authToken,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
  }, [APIURL, userProfile, availableTabs]);

  const {
    data: liveData,
    dataError: liveDataError,
    dataLoading: liveDataLoading,
  } = useFetch(options, time);

  const parseOptions = useMemo(() => {
    return { includeHistorical: false, probeTypesToInclude: ["therm"] };
  }, []);

  const { parsedData } = useDataParser(
    liveData,
    liveDataError,
    liveDataLoading,
    parseOptions
  );

  const hasLiveConnection = useMemo(() => {
    let mostRecentDate = 0;
    if (Object.keys(parsedData).length === 0) return false;
    Object.keys(parsedData).forEach((currentProbeType) => {
      const probeType = parsedData[currentProbeType];
      Object.keys(probeType).forEach((probe, i) => {
        if (
          !probeType[probe].hasOwnProperty("measure") ||
          !probeType[probe].hasOwnProperty("measure_created_at")
        ) {
          return;
        }
        if (i === 0) {
          mostRecentDate =
            probeType[probe].measurements[0]["measure_created_at"] * 1000;
          return;
        }
        if (
          mostRecentDate >
          probeType[probe].measurements[0]["measure_created_at"]
        ) {
          mostRecentDate =
            probeType[probe].measurements[0]["measure_created_at"] * 1000;
        }
      });
    });

    const secondDifference = time - mostRecentDate;
    if (mostRecentDate >= time || secondDifference <= 2000) return true;
    return false;
  }, [parsedData, time]);

  return (
    <SectionWrapper>
      <SectionTitleWrapper>
        <SectionTitle>Live Steamer Data</SectionTitle>
        <LiveConection hasLiveConnection={hasLiveConnection} />
      </SectionTitleWrapper>
      <SteamerBlueprint liveData={parsedData} />
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
