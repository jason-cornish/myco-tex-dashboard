import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import { ColumnWrapper, RowWrapper } from "./styled-components";
import {
  DropdownOption,
  DropdownOptions,
} from "../components/display/home/types";
import { useEffect, useRef, useState } from "react";
import { wrap } from "module";

type ExpectedProps = {
  options: DropdownOptions;
  selectedOption: string;
  setState: any;
};

const ProfileDropdown = (props: ExpectedProps) => {
  const wrapperRef = useRef<any>(null);

  const { setState, selectedOption, options } = props;
  // const { setState, options } = useContext(DataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = (optionClicked: string | boolean) => {
    if (optionClicked) {
      setState(optionClicked);
    }
    setModalOpen(!modalOpen);
  };

  // below is the same as componentDidMount and componentDidUnmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  return (
    <DropdownButton ref={wrapperRef}>
      <Button
        onClick={() => {
          handleClick(false);
        }}
      >
        <p>{props.selectedOption}</p>
        <Icon icon="caret-down" size={17} />
      </Button>
      {modalOpen ? (
        <DropdownWrapper>
          {options.map((option: DropdownOption) => {
            return (
              <Option
                onClick={() => {
                  setState(option.option);
                }}
                className={
                  option.option === selectedOption ? "selected" : "unselected"
                }
              >
                <h1>{option.option}</h1>
                {option.option === selectedOption ? (
                  <Icon icon="small-tick" size={17} />
                ) : (
                  <div className="hidden" />
                )}
              </Option>
            );
          })}
        </DropdownWrapper>
      ) : (
        <div className="hidden" />
      )}
    </DropdownButton>
  );
};

export default ProfileDropdown;

const DropdownButton = styled(RowWrapper)`
  position: relative;
  border-radius: ${(props) => props.theme.other.borderRadius};
  border: 1px solid ${(props) => props.theme.colors.greyDarker};

  fill: ${(props) => props.theme.colors.primaryWhite};

  transition: background-color 300ms ease-in-out;
  background-color: ${(props) => props.theme.colors.primaryBlack};
  cursor: pointer;
  .hidden {
    display: none;
  }
  .bp5-icon {
    margin-top: 2px;
  }
`;

const Button = styled(RowWrapper)`
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
  min-width: 150px;
  p {
    font-size: 15px;
    color: ${(props) => props.theme.colors.primaryWhite};
  }
`;

const DropdownWrapper = styled(ColumnWrapper)`
  top: 48px;
  right: 0px;
  left: 0px;
  position: absolute;
  @media only screen and (max-width: 850px) {
    left: -60px;
  }
  background-color: ${(props) => props.theme.colors.highlight3};
  box-shadow: ${(props) => props.theme.other.boxShadow};
  border-radius: ${(props) => props.theme.other.borderRadius};
  padding: 5px;
  row-gap: 5px;
  z-index: 3;

  .selected {
    background-color: ${(props) => props.theme.colors.highlight1};
    transition: all 300ms ease-in-out;
    h1 {
      color: ${(props) => props.theme.colors.secondaryBlack};
      transition: color 0ms ease-in-out;
    }
  }
  .unselected {
    transition: all 300ms ease-in-out;
    background-color: ${(props) => props.theme.colors.highlight3};
    :hover {
      filter: brightness(125%);
    }
    h1 {
      transition: color 0ms ease-in-out;
      /* :hover {
        color: ${(props) => props.theme.colors.primaryWhite};
      } */
    }
  }
`;

const Option = styled(RowWrapper)`
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: ${(props) => props.theme.other.borderRadius};
  padding: 9px 15px;
  height: 40px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 850px) {
    justify-content: center;
  }
  column-gap: 15px;
  transition: all 300ms ease-in-out;
  transition: color 0ms;
  .bp5-icon {
    fill: ${(props) => props.theme.colors.secondaryBlack};
  }
  h1 {
    display: flex;
    font-size: 15px;
  }
`;
