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
import useDataParser from "../../../../hooks/useDataParser";
import HistoricalSection from "./historical-section";

const SteamerPage = () => {
  return (
    <SteamerPageWrapper>
      {/* <SteamerLive /> */}

      {/* <Button
        type="fancy"
        text="Configure new sensor"
        icon={false}
        color={false}
        onClick={() => {}}
      /> */}

      <HistoricalSection />
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
