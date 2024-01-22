import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import { LiveLabDataType } from "./types";
import { useCallback, useEffect, useMemo, useState } from "react";
import LabBlueprint from "./lab-blueprint";
import LiveConection from "../live-connection";
import { HistoricalDataType } from "../types";
import TemperatureTimeChart from "../charts/temps-over-time/temp-time-chart";

const LabPage = () => {
  const [hasLiveConnection, setHasLiveConnection] = useState(true);
  const [historicalData, setHistoricalData] = useState<HistoricalDataType>([
    { name: "Temp #1", color: "#93C572", data: [] },
    { name: "Temp #2", color: "#a472c5", data: [] },
  ]);
  const [historicalTimeRange, setHistoricalTimeRange] = useState();
  const liveLabData: LiveLabDataType = useMemo(() => {
    return {
      temp1: 71,
      temp2: 71,
      temp3: 71,
      temp4: 71,
      ppm: 1000,
    };
  }, []);

  const fetchHistoricalData = useCallback(() => {
    const fetchedHistoricalData = [
      {
        name: "PPM",
        color: "#93C572",
        data: [
          [1253453834, 10],
          [1332648499, 29],
          [1402658481, 49],
          [1512658481, 79],
          [1653516428, 90],
          [1702658481, 100],
          [1802658481, 110],
          [1912658481, 105],
        ],
      },
    ];
    setHistoricalData(fetchedHistoricalData);
  }, [historicalTimeRange]);

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  const chartOptions = useMemo(() => {
    return {
      options: { yAxisType: "PPM" },
      data: historicalData,
    };
  }, [historicalData]);

  return (
    <LabPageWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>Live Lab Data</SectionTitle>
          <LiveConection
            hasLiveConnection={hasLiveConnection}
            setHasLiveConnection={setHasLiveConnection}
          />
        </SectionTitleWrapper>
        <LabBlueprint liveData={liveLabData} />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>PPM Over Time</SectionTitle>
        </SectionTitleWrapper>
        <ChartWrapper>
          <TemperatureTimeChart chartOptions={chartOptions} />
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
