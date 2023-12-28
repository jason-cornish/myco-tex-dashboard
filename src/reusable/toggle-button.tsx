import styled from "styled-components";
import { RowWrapper } from "./styled-components";

type PropsType = {
  option1: string;
  option2: string;
  state: any;
  onClick: any;
};

const Toggle = (props: PropsType) => {
  const { option1, option2, state, onClick } = props;
  return (
    <ToggleWrapper>
      <OptionLeft
        className={state === option1 ? "option selected" : "option unselected"}
      >
        {option1}
      </OptionLeft>
      <Divider />
      <OptionRight
        className={state === option2 ? "option selected" : "option unselected"}
      >
        {option2}
      </OptionRight>
    </ToggleWrapper>
  );
};

export default Toggle;

const ToggleWrapper = styled(RowWrapper)`
  /* border: 1px solid ${(props) => props.theme.colors.primaryWhite};
  border-radius: ${(props) => props.theme.other.borderRadius}; */
  column-gap: 0px !important;
  .option {
    padding: 7px 22px;
    width: 80px;
    column-gap: 0px;
    font-family: Roboto;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    transition: all 300ms ease-in-out;
    cursor: pointer;
  }
  .selected {
    background-color: ${(props) => props.theme.colors.highlight1};
    color: ${(props) => props.theme.colors.secondaryBlack};
  }
  .unselected {
    color: ${(props) => props.theme.colors.grey};
    border: 1px solid ${(props) => props.theme.colors.grey};
    background-color: ${(props) => props.theme.colors.primaryBlack};
    :hover {
      color: ${(props) => props.theme.colors.grey};
      border: 1px solid ${(props) => props.theme.colors.grey};
    }
  }
`;

const OptionLeft = styled(RowWrapper)`
  border-top-left-radius: ${(props) => props.theme.other.borderRadius};
  border-bottom-left-radius: ${(props) => props.theme.other.borderRadius};
  border-right: 0px !important;
`;

const OptionRight = styled(RowWrapper)`
  border-top-right-radius: ${(props) => props.theme.other.borderRadius};
  border-bottom-right-radius: ${(props) => props.theme.other.borderRadius};
  border-left: 0px !important;
`;

const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${(props) => props.theme.colors.highlight1};
`;
