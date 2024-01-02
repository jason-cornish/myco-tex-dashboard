import styled from "styled-components";

export const RowWrapper = styled.div`
  display: flex;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GreyText = styled.h3`
  color: ${(props) => props.theme.colors.grey};
  font-size: 26px;
  margin: 0px;
`;
