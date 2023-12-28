import styled from "styled-components";
import { ColumnWrapper } from "../../../../reusable/styled-components";

const MixerPage = () => {
  return (
    <MixerPageWrapper>
      <h1>mixer</h1>
    </MixerPageWrapper>
  );
};

export default MixerPage;

const MixerPageWrapper = styled(ColumnWrapper)`
  color: white;
`;
