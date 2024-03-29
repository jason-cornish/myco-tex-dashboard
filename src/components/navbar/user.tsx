import styled from "styled-components";
import Button from "../../reusable/button";
import { RowWrapper } from "../../reusable/styled-components";
import { Icon } from "@blueprintjs/core";
import JasonCompressed from "../../assets/JasonCompressed.jpg";
import { useContext, useState } from "react";
import ProfileDropdown from "./profile-dropdown";
import { DataContext } from "../../App";

const User = () => {
  const { userProfile } = useContext(DataContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <UserWrapper onClick={() => setDropdownOpen(!dropdownOpen)}>
      <ProfileImage>
        <Icon icon="person" size={18} />
      </ProfileImage>

      {/* <ProfileImage src={JasonCompressed} className="profileImg" /> */}
      <ProfileName>{userProfile.name}</ProfileName>
      <Icon icon="caret-down" size={18} />
      {dropdownOpen ? <ProfileDropdown /> : <div className="empty" />}
    </UserWrapper>
  );
};

export default User;

const UserWrapper = styled(RowWrapper)`
  position: relative;
  align-items: center;
  justify-content: center;
  transition: background-color 300ms ease-in-out;
  color: ${(props) => props.theme.colors.primaryWhite};
  background-color: ${(props) => props.theme.colors.primaryBlack};
  border: 1px solid ${(props) => props.theme.colors.primaryBlack};
  border-radius: ${(props) => props.theme.other.borderRadius};
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.colors.highlight3};
  }
  padding: 0px 10px;
  height: 42px;
  column-gap: 10px;
  .bp5-icon {
    margin-left: -5px;
    margin-top: 3px;
    fill: ${(props) => props.theme.colors.primaryWhite};
  }

  .empty {
    position: absolute;
  }
`;

const ProfileName = styled.h1`
  font-size: 18px;
  @media only screen and (max-width: 850px) {
    height: 55px;
    background-color: transparent;
    border: 0px;
    display: none;
  }
`;

// const ProfileImage = styled.img`
//   object-fit: cover;
//   border-radius: 50%;
//   height: 35px;
//   width: 35px;
//   @media only screen and (max-width: 850px) {
//     height: 50px;
//     width: 50px;
//   }
// `;

const ProfileImage = styled.div`
  display: flex;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  span {
    position: relative;
    left: 2px;
  }
  @media only screen and (max-width: 850px) {
    height: 50px;
    width: 50px;
  }
`;

const AcctIcon = styled.div`
  padding: 7px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
