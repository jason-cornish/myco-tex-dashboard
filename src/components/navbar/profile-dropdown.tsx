import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "../../reusable/styled-components";
import { Icon } from "@blueprintjs/core";
import { useContext } from "react";
import { DataContext } from "../../App";

const ProfileDropdown = () => {
  const { setUserProfile } = useContext(DataContext);
  const handleLogoutRequest = () => {
    setUserProfile({});
  };

  return (
    <ProfileDropdownWrapper>
      {/* <Option>
        <Icon icon="person" />
        <h1>Profile</h1>
      </Option> */}
      <Option onClick={handleLogoutRequest}>
        <Icon icon="log-out" />
        <h1>Logout</h1>
      </Option>
    </ProfileDropdownWrapper>
  );
};

export default ProfileDropdown;

const ProfileDropdownWrapper = styled(ColumnWrapper)`
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
    /* justify-content: center; */
  }
  column-gap: 15px;
  transition: background-color 300ms ease-in-out;
  h1 {
    font-size: 16px;
  }
  :hover {
    background-color: ${(props) => props.theme.colors.highlight4};
  }
`;
