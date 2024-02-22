import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "./styled-components";
import Dropdown from "./dropdown";
import { useState } from "react";
import { DropdownOption } from "../components/display/home/types";
import TemperatureTimeChart from "../components/display/home/charts/temps-over-time/temp-time-chart";

type PropsType = {
  data: any;
};
const ChartWrapper = (props: PropsType) => {
  const { data } = props;
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
  return (
    <Wrapper>
      <SectionTitleWrapper>
        <SectionTitle>Temperatures Over Time</SectionTitle>
        <Dropdown
          options={dropdownOptions}
          selectedOption={historicalTimeRange}
        />
      </SectionTitleWrapper>
      <TemperatureTimeChart
        chartOptions={{ yAxisType: "temp" }}
        parsedData={data}
      />
    </Wrapper>
  );
};

export default ChartWrapper;

const Wrapper = styled(ColumnWrapper)`
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
