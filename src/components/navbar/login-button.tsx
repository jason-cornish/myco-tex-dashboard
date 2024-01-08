import { Icon } from "@blueprintjs/core";
import styled from "styled-components";
import Button from "../../reusable/button";
import { RowWrapper } from "../../reusable/styled-components";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <LoginWrapper to="/login">
      <h1>Login</h1>
    </LoginWrapper>
  );
};

export default LoginButton;

const LoginWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${(props) => props.theme.other.borderRadius};
  background-color: ${(props) => props.theme.colors.highlight1};
  column-gap: 5px;
  padding: 10px 20px;
  color: ${(props) => props.theme.colors.primaryWhite};
  text-decoration: none;
  svg {
    fill: ${(props) => props.theme.colors.primaryWhite};
    padding-top: 3px;
  }
  h1 {
    margin: 0px;
    font-size: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.highlight3};
    font-family: Roboto;
  }
`;
