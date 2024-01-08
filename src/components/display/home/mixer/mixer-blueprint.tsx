import styled from "styled-components";
import {
  ColumnWrapper,
  GreyText,
} from "../../../../reusable/styled-components";
import { MixerDataType } from "./types";

type PropsType = {
  data: MixerDataType;
};

const MixerBlueprint = (props: PropsType) => {
  const { data } = props;
  return (
    <MixerWrapper>
      <GreyText>Mixer</GreyText>
      <DataText>{data.humidity}% Soil Moisture</DataText>
    </MixerWrapper>
  );
};

export default MixerBlueprint;

const MixerWrapper = styled(ColumnWrapper)`
  width: 325px;
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
