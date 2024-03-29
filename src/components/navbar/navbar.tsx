import { Icon } from "@blueprintjs/core";
import styled from "styled-components";
import { RowWrapper } from "../../reusable/styled-components";
import LogAscent from "./login-button";
import SearchBar from "./searchbar";
import User from "./user";
import Button from "../../reusable/button";
import LiveConection from "../display/home/live-connection";
import { useContext, useState } from "react";
import { DataContext } from "../../App";
import LoginButton from "./login-button";
import SignUpButton from "./sign-up-button";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { userProfile } = useContext(DataContext);
  const [hasLiveConnection, setHasLiveConnection] = useState<boolean>(true);
  return (
    <Nav>
      <LeftSection>
        <Logo className="logo" to="/home">
          <h1>MycoTex</h1>
        </Logo>
      </LeftSection>
      <RightSection>
        {userProfile.hasOwnProperty("name") ? (
          <User />
        ) : (
          <RightSection>
            <SignUpButton />
            <LoginButton />
          </RightSection>
        )}
      </RightSection>
    </Nav>
  );
};

export default NavBar;

const Nav = styled(RowWrapper)`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 70px;
  padding: 0px 20px;
  z-index: 3;
  box-sizing: border-box;
  border-bottom-left-radius: 0px;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primaryBlack};
  font-family: ${(props) => props.theme.fonts.header};
  box-shadow: inset 0px -12px 1px -12px rgba(204, 208, 217, 1);

  @media only screen and (max-width: 850px) {
    background-color: ${(props) => props.theme.colors.primaryBlack};
    .liveComponent {
      display: none;
    }
    top: 0px;
    /* .logo {
      display: none;
    } */
    width: 100%;
    left: 0px;
    height: 75px;
    padding: 20px;
  }
`;

const Logo = styled(Link)`
  column-gap: 12px;
  align-items: center;
  text-decoration: none;
  .bp5-icon {
    fill: ${(props) => props.theme.colors.primaryWhite};
    margin-bottom: -5px;
  }
  color: ${(props) => props.theme.colors.primaryWhite};
`;

const LeftSection = styled(RowWrapper)`
  column-gap: 20px;
  align-items: center;
  justify-content: center;
  h1 {
    font-family: Archivo;
    font-size: 30px;
    color: ${(props) => props.theme.colors.primaryWhite};
    font-weight: 500;
  }
`;

const RightSection = styled(RowWrapper)`
  column-gap: 15px;
  align-items: center;
  justify-content: center;
`;

const DisplayConditional = styled.div`
  display: flex;
  @media only screen and (max-width: 1100px) {
    display: none;
  }
  @media only screen and (max-width: 850px) {
    display: none;
  }
`;
