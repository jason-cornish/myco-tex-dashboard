import styled from "styled-components";
import { ColumnWrapper } from "../../../../reusable/styled-components";
import IncubatorBlueprint from "./incubator-blueprint";
import { useMemo } from "react";
import { LiveIncubatorDataType } from "./types";

const IncubatorPage = () => {
  const liveIncubatorData: LiveIncubatorDataType = useMemo(() => {
    return {
      temp1: 73,
      temp2: 72,
      temp3: 74,
      temp4: 70,
      co2: 20,
    };
  }, []);
  return (
    <IncubatorPageWrapper>
      <IncubatorBlueprint liveData={liveIncubatorData} />
    </IncubatorPageWrapper>
  );
};

export default IncubatorPage;

const IncubatorPageWrapper = styled(ColumnWrapper)`
  color: white;
  align-items: center;
`;
