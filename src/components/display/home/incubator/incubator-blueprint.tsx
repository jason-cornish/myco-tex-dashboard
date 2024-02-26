import styled from "styled-components";
import {
  ColumnWrapper,
  GreyText,
} from "../../../../reusable/styled-components";
import { useMemo } from "react";

type PropsType = {
  liveData: any;
};

const IncubatorBlueprint = (props: PropsType) => {
  const { liveData } = props;
  const classes = ["one", "two", "three", "four"];

  const liveTemperatures = useMemo(() => {
    let response: any = [
      { name: "temp_1", measure: "?" },
      { name: "temp_2", measure: "?" },
      { name: "temp_3", measure: "?" },
      { name: "temp_4", measure: "?" },
    ];
    if (liveData.hasOwnProperty("therm")) {
      if (Object.keys(liveData).length > 0) {
        Object.keys(liveData.therm).forEach((probe, i) => {
          response[i] = {
            name: probe,
            measure: liveData.therm[probe].measurements[0].measure,
          };
        });
      }
    }
    return response;
  }, [liveData]);

  const liveCo2 = useMemo(() => {
    let response: any = ["?"];
    if (liveData.hasOwnProperty("co2")) {
      if (Object.keys(liveData).length > 0) {
        Object.keys(liveData.co2).forEach((probe, i) => {
          if (i > 0) return;
          response[0] = liveData["co2"][probe].measurements[0].measure;
        });
      }
    }
    return response;
  }, [liveData]);

  return (
    <IncubatorWrapper>
      {liveTemperatures.length > 0 ? (
        liveTemperatures.map((temp: any, i: number) => {
          return (
            <TemperatureReading className={classes[i]}>
              <DataText>
                {temp.measure}
                {"\u00b0"}
              </DataText>
              <SubGreyText>{temp.name}</SubGreyText>
            </TemperatureReading>
          );
        })
      ) : (
        <div />
      )}
      <GreyText>Incubation Room</GreyText>
      <PPMText>{liveCo2[0]} PPM (CO2)</PPMText>
    </IncubatorWrapper>
  );
};

export default IncubatorBlueprint;

const IncubatorWrapper = styled(ColumnWrapper)`
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
