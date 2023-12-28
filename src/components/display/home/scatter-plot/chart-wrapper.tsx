import styled from "styled-components";
import {
  ColumnWrapper,
  GreyText,
  RowWrapper,
} from "../../../../reusable/styled-components";
import ScatterChart from "./scatter-chart";
import { DataContext } from "../../../../App";
import { useContext, useMemo } from "react";
import { formatScatterChartData } from "./format-data";

const ScatterChartContainer = () => {
  const { ascents, setAscents } = useContext(DataContext);

  const formattedData = useMemo(() => {
    return ascents.length > 0 ? formatScatterChartData(ascents) : false;
  }, [ascents]);

  return (
    <StyledColumnWrapper>
      <GreyText>Total Ascents</GreyText>
      <ChartWrapper>
        <ScatterChart />
      </ChartWrapper>
    </StyledColumnWrapper>
  );
};

export default ScatterChartContainer;

const StyledColumnWrapper = styled(ColumnWrapper)`
  width: 100%;
  row-gap: 10px;
  justify-content: flex-end;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.primaryBlack};
  box-shadow: ${(props) => props.theme.other.boxShadow};
  border-radius: ${(props) => props.theme.other.borderRadius};
  padding: 15px;
  padding-top: 35px;
  padding-right: 30px;
`;
