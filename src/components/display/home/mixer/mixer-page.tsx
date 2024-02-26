import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import MixerLive from "./mixer-live";

const MixerPage = () => {
  return (
    <MixerPageWrapper>
      <MixerLive />
    </MixerPageWrapper>
  );
};

export default MixerPage;

const MixerPageWrapper = styled(ColumnWrapper)`
  row-gap: 10px;
`;
