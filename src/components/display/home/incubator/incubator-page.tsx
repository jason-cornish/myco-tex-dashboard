import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import IncubatorBlueprint from "./incubator-blueprint";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LiveIncubatorDataType } from "./types";
import LiveConection from "../live-connection";
import TemperatureTimeChart from "../charts/temps-over-time/temp-time-chart";
import { HistoricalDataType } from "../types";

const IncubatorPage = () => {
  const [hasLiveConnection, setHasLiveConnection] = useState(true);
  const [historicalTempData, setHistoricalTempData] =
    useState<HistoricalDataType>([
      { name: "Temp #1", color: "#93C572", data: [] },
      { name: "Temp #2", color: "#a472c5", data: [] },
    ]);
  const [historicalTempTimeRange, setHistoricalTempTimeRange] = useState();

  const [historicalCo2Data, setHistoricalCo2Data] =
    useState<HistoricalDataType>([
      { name: "Temp #1", color: "#93C572", data: [] },
      { name: "Temp #2", color: "#a472c5", data: [] },
    ]);
  const [historicalCo2TimeRange, setHistoricalCo2TimeRange] = useState();

  const liveIncubatorData: LiveIncubatorDataType = useMemo(() => {
    return {
      temp1: 73,
      temp2: 72,
      temp3: 74,
      temp4: 70,
      co2: 20,
    };
  }, []);

  const fetchHistoricalTempData = useCallback(() => {
    const fetchedHistoricalData = [
      {
        name: "Temp #1",
        color: "#93C572",
        data: [
          [1253453834, 70],
          [1332648499, 89],
          [1402658481, 89],
          [1512658481, 89],
          [1653516428, 70],
          [1702658481, 89],
          [1802658481, 89],
          [1912658481, 89],
        ],
      },
      {
        name: "Temp #2",
        color: "#a472c5",
        data: [
          [1253453834, 71],
          [1702658481, 91],
          [1902658481, 91],
        ],
      },
    ];
    setHistoricalTempData(fetchedHistoricalData);
  }, [historicalTempTimeRange]);

  useEffect(() => {
    fetchHistoricalTempData();
  }, [fetchHistoricalTempData]);

  const fetchHistoricalCo2Data = useCallback(() => {
    const fetchedHistoricalData = [
      {
        name: "Temp #1",
        color: "#93C572",
        data: [
          [1253453834, 70],
          [1332648499, 89],
          [1402658481, 89],
          [1512658481, 89],
          [1653516428, 70],
          [1702658481, 89],
          [1802658481, 89],
          [1912658481, 89],
        ],
      },
    ];
    setHistoricalCo2Data(fetchedHistoricalData);
  }, [historicalCo2TimeRange]);

  useEffect(() => {
    fetchHistoricalCo2Data();
  }, [fetchHistoricalCo2Data]);

  const tempChartOptions = useMemo(() => {
    return {
      options: { yAxisType: "temperature" },
      data: historicalTempData,
    };
  }, [historicalTempData]);

  const co2ChartOptions = useMemo(() => {
    return {
      options: { yAxisType: "percentage" },
      data: historicalCo2Data,
    };
  }, [historicalCo2Data]);

  return (
    <IncubatorPageWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>Live Incubation Data</SectionTitle>
          <LiveConection
            hasLiveConnection={hasLiveConnection}
            setHasLiveConnection={setHasLiveConnection}
          />
        </SectionTitleWrapper>
        <IncubatorBlueprint liveData={liveIncubatorData} />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>Temperatures Over Time</SectionTitle>
        </SectionTitleWrapper>
        <ChartWrapper>
          <TemperatureTimeChart chartOptions={tempChartOptions} />
        </ChartWrapper>
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>CO2 Over Time</SectionTitle>
        </SectionTitleWrapper>
        <ChartWrapper>
          <TemperatureTimeChart chartOptions={co2ChartOptions} />
        </ChartWrapper>
      </SectionWrapper>
    </IncubatorPageWrapper>
  );
};

export default IncubatorPage;

const IncubatorPageWrapper = styled(ColumnWrapper)`
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
