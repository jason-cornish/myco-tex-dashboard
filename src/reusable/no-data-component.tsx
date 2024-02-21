import styled from "styled-components";
import { ReactComponent as EmptyBox } from "../assets/empty-box.svg";
import { ColumnWrapper } from "./styled-components";

const NoDataComponent = () => {
  return (
    <NoData>
      <EmptyBox />
      <ErrorMessage>No data found.</ErrorMessage>
      <ErrorMessageSpecific>
        Try signing out and logging in again.
      </ErrorMessageSpecific>
    </NoData>
  );
};

export default NoDataComponent;

const NoData = styled(ColumnWrapper)`
  margin-top: 50px;
  align-items: center;
  svg {
    width: 450px;
    margin-bottom: -20px;
  }
`;

const ErrorMessage = styled.h1`
  margin: 0px;
  color: ${(props) => props.theme.colors.primaryWhite};
  font-weight: 600;
  margin-bottom: 10px;
`;

const ErrorMessageSpecific = styled.p`
  color: ${(props) => props.theme.colors.grey};
`;
