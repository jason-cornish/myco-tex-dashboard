import styled from "styled-components";
import { GreyText } from "./styled-components";

type PropsType = {
  data: any;
  name: string;
  className: string;
};

const LiveReading = (props: PropsType) => {
  const { data, name, className } = props;

  return (
    <TemperatureReading className={className}>
      <DataText>
        {Math.round(data.measure)}
        {"\u00b0"}
      </DataText>
      <SubGreyText>{name}</SubGreyText>
    </TemperatureReading>
  );
};

export default LiveReading;

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
