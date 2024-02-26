import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "./styled-components";
import { Icon } from "@blueprintjs/core";

type PropsType = {
  handleClick: any;
  options: string[];
  icons: any;
};

const DropdownPopout = (props: PropsType) => {
  const { options, handleClick } = props;

  return (
    <DropdownWrapper>
      {options.map((option) => {
        return (
          <Option onClick={() => handleClick("option")}>
            <h1>{option}</h1>
          </Option>
        );
      })}
    </DropdownWrapper>
  );
};

export default DropdownPopout;

const DropdownWrapper = styled(ColumnWrapper)`
  top: 50px;
  right: 0px;
  left: 0px;
  position: absolute;
  @media only screen and (max-width: 850px) {
    left: -60px;
  }
  background-color: ${(props) => props.theme.colors.highlight3};
  box-shadow: ${(props) => props.theme.other.boxShadow};
  border-radius: ${(props) => props.theme.other.borderRadius};
  padding: 10px;
  row-gap: 5px;
`;
const Option = styled(RowWrapper)`
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: ${(props) => props.theme.other.borderRadius};
  padding: 10px 25px;
  box-sizing: border-box;
  align-items: center;
  @media only screen and (max-width: 850px) {
    justify-content: center;
  }
  column-gap: 15px;
  transition: background-color 300ms ease-in-out;
  h1 {
    display: flex;
  }
  :hover {
    background-color: ${(props) => props.theme.colors.highlight4};
  }
`;
