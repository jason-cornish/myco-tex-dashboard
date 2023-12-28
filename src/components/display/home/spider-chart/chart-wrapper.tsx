import { Chart } from "@blueprintjs/icons";
import styled from "styled-components";
import SpiderChart from "./spider-chart";
import {
  ColumnWrapper,
  GreyText,
  RowWrapper,
} from "../../../../reusable/styled-components";
import { Icon, Popover } from "@blueprintjs/core";

const SpiderChartContainer = () => {
  return (
    <SpiderChartWrapper>
      <RowWrapper className="row">
        <GreyText>Hold Type Analysis</GreyText>
        <Popover>
          <DropdownWrapper>
            <p>V7</p>
            <Icon icon="caret-down" />
          </DropdownWrapper>
        </Popover>
      </RowWrapper>

      <ChartWrapper>
        <SpiderChart />
      </ChartWrapper>
    </SpiderChartWrapper>
  );
};

export default SpiderChartContainer;

const SpiderChartWrapper = styled(ColumnWrapper)`
  width: 400px;
  min-width: 400px;
  .row {
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.primaryBlack};
  box-shadow: ${(props) => props.theme.other.boxShadow};
  border-radius: ${(props) => props.theme.other.borderRadius};
  padding: 15px;
  margin-top: 10px;
`;

const DropdownWrapper = styled(RowWrapper)`
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primaryBlack};
  box-shadow: ${(props) => props.theme.other.boxShadow};
  border-radius: ${(props) => props.theme.other.borderRadius};
  padding: 0px 15px;
  p {
    color: ${(props) => props.theme.colors.primaryWhite};
    font-size: 16px;
  }
  .bp5-icon {
    fill: ${(props) => props.theme.colors.primaryWhite};
  }
`;
