import styled from "styled-components";
import { ColumnWrapper } from "../../../../reusable/styled-components";
import { LiveLabDataType } from "./types";
import { useMemo } from "react";
import LabBlueprint from "./lab-blueprint";

const LabPage = () => {
  const liveLabData: LiveLabDataType = useMemo(() => {
    return {
      temp1: 71,
      temp2: 71,
      temp3: 71,
      temp4: 71,
      ppm: 1000,
    };
  }, []);
  return (
    <LabPageWrapper>
      <LabBlueprint liveData={liveLabData} />
    </LabPageWrapper>
  );
};

export default LabPage;

const LabPageWrapper = styled(ColumnWrapper)`
  color: white;
  align-items: center;
`;
