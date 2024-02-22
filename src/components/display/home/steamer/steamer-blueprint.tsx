import styled from "styled-components";
import {
  ColumnWrapper,
  GreyText,
} from "../../../../reusable/styled-components";
import { LiveSteamerDataType } from "../types";
import LiveReading from "../../../../reusable/live-reading";

type PropsType = {
  liveData: LiveSteamerDataType;
};

const SteamerBlueprint = (props: PropsType) => {
  const { liveData } = props;
  const classes = ["one", "two", "three", "four"];
  return (
    <SteamerWrapper>
      {/* <p>test</p> */}
      {Object.keys(liveData).map((probe, i) => {
        return (
          <LiveReading
            data={liveData[probe].measurements[0]}
            name={probe}
            className={classes[i]}
          />
        );
      })}
      <GreyText>Steamer</GreyText>
    </SteamerWrapper>
  );
};

export default SteamerBlueprint;

const SteamerWrapper = styled(ColumnWrapper)`
  position: relative;
  max-width: 700px;
  width: 100%;
  height: 325px;
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

const SubGreyText = styled(GreyText)`
  font-size: 18px;
`;
