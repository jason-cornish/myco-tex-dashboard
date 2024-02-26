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
import LabLive from "./lab-live";
import HistoricalSection from "./historical-section";

const LabPage = () => {
  const { userProfile, APIURL } = useContext(DataContext);
  const { availableTabs, fetchFromAPI, reportDataAvailable } =
    useContext(HomeContext);

  const [liveTemperature, setLiveTemperature] = useState<LiveReadingType>({
    lastUpdated: 0,
    value: 0,
  });

  const time = useTimer(1000);

  return (
    <LabPageWrapper>
      <LabLive />
      <HistoricalSection />
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
