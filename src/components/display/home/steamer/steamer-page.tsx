import styled from "styled-components";
import { ColumnWrapper } from "../../../../reusable/styled-components";

const SteamerPage = () => {
  return (
    <SteamerPageWrapper>
      <h1>steamer</h1>
    </SteamerPageWrapper>
  );
};

export default SteamerPage;

const SteamerPageWrapper = styled(ColumnWrapper)`
  color: white;
`;
