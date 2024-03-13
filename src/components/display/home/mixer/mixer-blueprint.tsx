import styled from "styled-components";
import {
  ColumnWrapper,
  GreyText,
} from "../../../../reusable/styled-components";
import { LiveMixerDataType } from "../types";
import { useMemo } from "react";

type PropsType = {
  liveData: LiveMixerDataType;
};

const MixerBlueprint = (props: PropsType) => {
  const { liveData } = props;
  const liveMixerData = useMemo(() => {
    let reading: string | number = "?";
    if (liveData.hasOwnProperty("hum")) {
      if (Object.keys(liveData.hum).length > 0) {
        const probeName = Object.keys(liveData.hum)[0];
        if (liveData.hum[probeName].measurements.length > 0) {
          reading = liveData.hum[probeName].measurements[0].measure.toFixed(2);
        }
      }
    }
    return reading;
  }, [liveData]);
  return (
    <MixerWrapper>
      <GreyText>Mixer</GreyText>
      <DataText>{liveMixerData}% Soil Moisture</DataText>
    </MixerWrapper>
  );
};

export default MixerBlueprint;

const MixerWrapper = styled(ColumnWrapper)`
  width: 350px;
  height: 325px;
  background-color: ${(props) => props.theme.colors.highlight3};
  border-radius: ${(props) => props.theme.other.borderRadius};
  box-shadow: ${(props) => props.theme.other.boxShadow};
  align-items: center;
  justify-content: center;
  row-gap: 5px;
`;

const DataText = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primaryWhite};
`;
