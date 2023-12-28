import styled from "styled-components";
import {
  ColumnWrapper,
  GreyText,
  RowWrapper,
} from "../../../../reusable/styled-components";
import AscentsChart from "./ascents-chart";

const AscentsChartContainer = () => {
  return (
    <StyledColumnWrapper>
      <GreyText>Ascents per grade</GreyText>
      <ChartWrapper>
        <AscentsChart />
      </ChartWrapper>
    </StyledColumnWrapper>
  );
};

export default AscentsChartContainer;

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
