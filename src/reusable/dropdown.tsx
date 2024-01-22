import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import { ColumnWrapper, RowWrapper } from "./styled-components";
import { DropdownOption } from "../components/display/home/types";
import { useState } from "react";

type ExpectedProps = {
  options: DropdownOption[];
  selectedOption: string;
};

const ProfileDropdown = (props: ExpectedProps) => {
  // const { setState, options } = useContext(DataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const handleLogoutRequest = () => {
    // setState({});
  };

  return (
    <DropdownButton>
      <p>{props.selectedOption}</p>
      <Icon icon="caret-down" size={15} />
      {}
    </DropdownButton>
  );
};

export default ProfileDropdown;

const DropdownButton = styled(RowWrapper)`
  column-gap: 5px;
  align-items: center;
  border-radius: ${(props) => props.theme.other.borderRadius};
  border: 1px solid ${(props) => props.theme.colors.grey};
  padding: 10px 10px;
  fill: ${(props) => props.theme.colors.primaryWhite};
  p {
    font-size: 16px;
    color: ${(props) => props.theme.colors.primaryWhite};
  }
`;

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
