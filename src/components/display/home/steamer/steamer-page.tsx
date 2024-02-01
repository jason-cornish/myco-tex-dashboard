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
import { useCallback, useEffect, useMemo, useState } from "react";
import SteamerBlueprint from "./steamer-blueprint";
import LiveConection from "../live-connection";
import Button from "../../../../reusable/button";
import TemperatureTimeChart from "../charts/temps-over-time/temp-time-chart";
import Dropdown from "../../../../reusable/dropdown";

const SteamerPage = () => {
  const [hasLiveConnection, setHasLiveConnection] = useState(true);
  const [historicalData, setHistoricalData] = useState<HistoricalDataType>([
    { name: "Temp #1", color: "#93C572", data: [] },
    { name: "Temp #2", color: "#a472c5", data: [] },
  ]);
  const [historicalTimeRange, setHistoricalTimeRange] =
    useState<string>("24 hours");
  const liveSteamerData: LiveSteamerDataType = useMemo(() => {
    return {
      temp1: 180,
      temp2: 180,
      temp3: 175,
      temp4: 183,
    };
  }, []);

  const fetchHistoricalData = useCallback(() => {
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
    setHistoricalData(fetchedHistoricalData);
  }, [historicalTimeRange]);

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  const chartOptions = useMemo(() => {
    return {
      options: { yAxisType: "temperature" },
      data: historicalData,
    };
  }, [historicalData]);

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

  return (
    <SteamerPageWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>Live Steamer Data</SectionTitle>
          <LiveConection hasLiveConnection={hasLiveConnection} />
        </SectionTitleWrapper>
        <SteamerBlueprint liveData={liveSteamerData} />
      </SectionWrapper>

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
          <TemperatureTimeChart chartOptions={chartOptions} />
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
