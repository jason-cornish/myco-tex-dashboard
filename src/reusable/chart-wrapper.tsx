import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "./styled-components";
import Dropdown from "./dropdown";
import { useState } from "react";
import {
  DropdownOption,
  DropdownOptions,
} from "../components/display/home/types";
import TemperatureTimeChart from "../components/display/home/charts/temps-over-time/temp-time-chart";
import useTimeRangeFilter from "../hooks/useTimeRangeFilter";

type PropsType = {
  data: any;
  title: string;
};
const ChartWrapper = (props: PropsType) => {
  const { data, title } = props;
  const [historicalTimeRange, setHistoricalTimeRange] =
    useState<string>("Last 30 days");

  const handleClickOption: any = (value: string, stateName?: string) => {
    setHistoricalTimeRange(value);
  };

  const dropdownOptions: DropdownOptions = [
    {
      option: "Last 24 hours",
      onClick: () => handleClickOption("Last 24 hours"),
      icon: false,
    },
    {
      option: "Last 7 days",
      onClick: () => handleClickOption("Last 7 days"),
      icon: false,
    },
    {
      option: "Last 30 days",
      onClick: () => handleClickOption("Last 30 days"),
      icon: false,
    },
    {
      option: "Last 90 days",
      onClick: () => handleClickOption("Last 90 days"),
      icon: false,
    },
  ];

  const { filteredData: filteredMeasurements } = useTimeRangeFilter(
    data,
    historicalTimeRange
  );

  return (
    <Wrapper>
      <SectionTitleWrapper>
        <SectionTitle>{title}</SectionTitle>
        <Dropdown
          options={dropdownOptions}
          selectedOption={historicalTimeRange}
          setState={setHistoricalTimeRange}
        />
      </SectionTitleWrapper>
      <TemperatureTimeChart
        chartOptions={{ yAxisType: "temp" }}
        parsedData={filteredMeasurements}
      />
    </Wrapper>
  );
};

export default ChartWrapper;

const Wrapper = styled(ColumnWrapper)`
  padding-top: 10px;
`;

const SectionTitleWrapper = styled(RowWrapper)`
  column-gap: 10px;
  align-items: center;
  position: relative;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h1`
  font-size: 24px !important;
  color: ${(props) => props.theme.colors.grey} !important;
`;
