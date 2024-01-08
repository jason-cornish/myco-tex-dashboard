import styled from "styled-components";
import {
  ColumnWrapper,
  GreyText,
} from "../../../../reusable/styled-components";
import { LiveLabDataType } from "./types";

type PropsType = {
  liveData: LiveLabDataType;
};

const LabBlueprint = (props: PropsType) => {
  const { liveData } = props;
  return (
    <LabWrapper>
      {/* <TemperatureReading className="one">
        <DataText>
          {liveData.temp1}
          {"\u00b0"}
        </DataText>
        <SubGreyText>Temp #1</SubGreyText>
      </TemperatureReading>
      <TemperatureReading className="two">
        <DataText>
          {liveData.temp2}
          {"\u00b0"}
        </DataText>
        <SubGreyText>Temp #2</SubGreyText>
      </TemperatureReading>
      <TemperatureReading className="three">
        <DataText>
          {liveData.temp3}
          {"\u00b0"}
        </DataText>
        <SubGreyText>Temp #3</SubGreyText>
      </TemperatureReading>
      <TemperatureReading className="four">
        <DataText>
          {liveData.temp4}
          {"\u00b0"}
        </DataText>
        <SubGreyText>Temp #4</SubGreyText>
      </TemperatureReading> */}
      <GreyText>Lab</GreyText>
      <PPMText>{liveData.ppm} PM2.5</PPMText>
      <PPMText>
        {liveData.temp1}
        {"\u00b0"}
      </PPMText>
    </LabWrapper>
  );
};

export default LabBlueprint;

const LabWrapper = styled(ColumnWrapper)`
  position: relative;
  max-width: 800px;
  width: 100%;
  height: 400px;
  background-color: ${(props) => props.theme.colors.highlight3};
  border-radius: ${(props) => props.theme.other.borderRadius};
  box-shadow: ${(props) => props.theme.other.boxShadow};
  align-items: center;
  justify-content: center;
  row-gap: 5px;
  .one {
    position: absolute;
    left: 20px;
    top: 15px;
  }
  .two {
    position: absolute;
    right: 20px;
    top: 15px;
  }
  .three {
    position: absolute;
    left: 20px;
    bottom: 15px;
  }
  .four {
    position: absolute;
    right: 20px;
    bottom: 15px;
  }
`;

const TemperatureReading = styled.div`
  font-weight: bold;
  text-align: center;
  row-gap: 3px;
`;

const DataText = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primaryWhite};
  margin-left: 5px;
`;

const PPMText = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primaryWhite};
`;

const SubGreyText = styled(GreyText)`
  font-size: 18px;
`;
