import styled from "styled-components";
import {
  ColumnWrapper,
  GreyText,
} from "../../../../reusable/styled-components";
import { LiveSteamerDataType } from "../types";
import LiveReading from "../../../../reusable/live-reading";
import { useMemo } from "react";

type PropsType = {
  liveData: LiveSteamerDataType;
};

const SteamerBlueprint = (props: PropsType) => {
  const { liveData } = props;
  const classes = ["one", "two", "three", "four"];

  const temperatureProbes = useMemo(() => {
    let probes = [];
    if (liveData.hasOwnProperty("therm")) {
      probes = liveData.therm;
    }
    return probes;
  }, [liveData]);
  return (
    <SteamerWrapper>
      {Object.keys(temperatureProbes).map((probe: any, i) => {
        return (
          <LiveReading
            data={temperatureProbes[probe].measurements[0]}
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
