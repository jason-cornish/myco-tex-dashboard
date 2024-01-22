import { Icon } from "@blueprintjs/core";
import styled from "styled-components";
import { RowWrapper } from "./styled-components";

type PropsType = {
  text: string | boolean;
  icon: any;
  onClick: any;
  type: string;
  children?: any;
  color: string | boolean;
};

type ColorProps = {
  customColor: string | boolean;
};

const Button = (props: PropsType) => {
  const { text, icon, onClick, type, children, color } = props;

  return type === "regular" ? (
    <RegularButtonWrapper onClick={onClick} key="regular">
      {icon}
      {text ? <p>{text}</p> : <></>}
      {children ? children : <div />}
    </RegularButtonWrapper>
  ) : (
    <FancyButtonWrapper onClick={onClick} key="fancy" customColor={color}>
      {icon}
      {text ? <p>{text}</p> : <></>}
      {children ? children : <div />}
    </FancyButtonWrapper>
  );
};

export default Button;

const RegularButtonWrapper = styled(RowWrapper)`
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.other.borderRadius};
  /* border: 2px solid ${(props) => props.theme.colors.primaryWhite}; */
  padding: 0px 15px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.highlight3};
  transition: background-color 0.3s ease-in-out;
  .dropdown {
    bottom: 0px;
  }
  cursor: pointer;
  p {
    margin: 0px;
    color: ${(props) => props.theme.colors.primaryWhite};
  }
  svg {
    fill: ${(props) => props.theme.colors.primaryWhite};
    padding-top: 3px;
  }
  :hover {
    background-color: ${(props) => props.theme.colors.highlight4};
  }
`;

const FancyButtonWrapper = styled(RowWrapper)<ColorProps>`
  align-items: center;
  justify-content: center;
  height: 50px;
  column-gap: 10px;
  border-radius: ${(props) => props.theme.other.borderRadius};
  /* border: 2px solid ${(props) => props.theme.colors.primaryWhite}; */
  padding: 0px 15px;
  background-color: ${(props) =>
    props.customColor ? props.customColor : props.theme.colors.highlight1};
  transition: filter 0.3s ease-in-out;
  cursor: pointer;
  p {
    font-size: 16px;
    margin: 0px;
    color: ${(props) => props.theme.colors.secondaryBlack} !important;
  }
  svg {
    fill: ${(props) => props.theme.colors.secondaryBlack};
    padding-top: 3px;
  }
  :hover {
    filter: brightness(120%);
  }
`;
