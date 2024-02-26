import styled from "styled-components";
import { ColumnWrapper } from "../../../../reusable/styled-components";
import SteamerLive from "./steamer-live";
import HistoricalSection from "./historical-section";

const SteamerPage = () => {
  return (
    <SteamerPageWrapper>
      <SteamerLive />

      {/* <Button
        type="fancy"
        text="Configure new sensor"
        icon={false}
        color={false}
        onClick={() => {}}
      /> */}

      <HistoricalSection />
    </SteamerPageWrapper>
  );
};

export default SteamerPage;

const SteamerPageWrapper = styled(ColumnWrapper)`
  row-gap: 25px;
`;
