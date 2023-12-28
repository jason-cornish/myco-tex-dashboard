import styled from "styled-components";
import { RowWrapper } from "./styled-components";

type PropsType = { state: any; updateState: any; filterName: string };

const MaxAttempts = (props: PropsType) => {
  const { state, updateState, filterName } = props;
  const options = ["Any", "1", "2", "3", "4", "5"];
  return (
    <MaxAttemptsWrapper>
      {options.map((option, idx) => {
        return (
          <Chip
            className={option === state.maxAttempts ? "selected" : "unselected"}
            key={`${option}-${idx}`}
            onClick={() => {
              updateState(filterName, option);
            }}
          >
            <p>{option}</p>
          </Chip>
        );
      })}
    </MaxAttemptsWrapper>
  );
};

export default MaxAttempts;

const MaxAttemptsWrapper = styled(RowWrapper)`
  .selected {
    background-color: ${(props) => props.theme.colors.highlight1};
    p {
      color: ${(props) => props.theme.colors.secondaryBlack};
    }
  }
  .unselected {
    p {
      color: ${(props) => props.theme.colors.primaryWhite};
    }
    :hover {
      background-color: ${(props) => props.theme.colors.highlight4};
    }
  }
`;

const Chip = styled.div`
  padding: 7px 20px;
  border-radius: ${(props) => props.theme.other.borderRadius};
  background-color: ${(props) => props.theme.colors.highlight3};
  transition: all 500ms ease-in-out;
  cursor: pointer;
  p {
    font-size: 18px;
  }
`;
