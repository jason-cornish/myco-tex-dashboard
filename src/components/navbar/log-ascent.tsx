import { Icon } from "@blueprintjs/core";
import styled from "styled-components";
import Button from "../../reusable/button";
import { RowWrapper } from "../../reusable/styled-components";

const LogAscent = () => {
  return (
    <LogAscentWrapper>
      <Icon icon="add" />
      <h1>Log Ascent</h1>
    </LogAscentWrapper>
  );
};

export default LogAscent;

const LogAscentWrapper = styled(RowWrapper)`
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primaryWhite};
  border-radius: ${(props) => props.theme.other.borderRadius};
  background-color: ${(props) => props.theme.colors.highlight1};
  column-gap: 5px;
  padding: 5px 10px;
  color: ${(props) => props.theme.colors.primaryWhite};
  svg {
    fill: ${(props) => props.theme.colors.primaryWhite};
    padding-top: 3px;
  }
  h1 {
    margin: 0px;
    font-size: 20px;
  }
`;
