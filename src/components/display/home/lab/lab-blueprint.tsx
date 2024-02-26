import styled from "styled-components";
import {
  ColumnWrapper,
  GreyText,
} from "../../../../reusable/styled-components";
import { LiveLabDataType } from "./types";
import { useMemo } from "react";

type PropsType = {
  liveData: LiveLabDataType;
};

const LabBlueprint = (props: PropsType) => {
  const { liveData } = props;
  const liveTemperatures = useMemo(() => {
    let response = ["?"];
    if (liveData.hasOwnProperty("therm")) {
      if (Object.keys(liveData).length > 0) {
        Object.keys(liveData.therm).forEach((probe, i) => {
          //temporary, need to remove probes from Josh's account
          if (i > 0) return;
          response[i] = liveData.therm[probe].measurements[0].measure;
        });
      }
    }
    return response;
  }, [liveData]);

  const livePPM = useMemo(() => {
    let response = ["?"];
    if (liveData.hasOwnProperty("ppm")) {
      if (Object.keys(liveData).length > 0) {
        Object.keys(liveData.ppm).forEach((probe, i) => {
          //temporary, need to remove probes from Josh's account
          if (i > 0) return;
          response[0] = liveData.ppm[probe].measurements[0].measure;
        });
      }
    }
    return response;
  }, [liveData]);
  return (
    <LabWrapper>
      <GreyText>Lab</GreyText>
      <PPMText>{livePPM[0]} PM2.5</PPMText>
      <PPMText>
        {liveTemperatures[0]}
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

const PPMText = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primaryWhite};
`;
