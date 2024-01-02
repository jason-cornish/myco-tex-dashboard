import styled from "styled-components";
import { ColumnWrapper } from "../../../../reusable/styled-components";
import { LiveSteamerDataType } from "./types";
import { useMemo } from "react";
import SteamerBlueprint from "./steamer-blueprint";

const SteamerPage = () => {
  const liveSteamerData: LiveSteamerDataType = useMemo(() => {
    return {
      temp1: 180,
      temp2: 180,
      temp3: 175,
      temp4: 183,
    };
  }, []);

  return (
    <SteamerPageWrapper>
      <SteamerBlueprint liveData={liveSteamerData} />
    </SteamerPageWrapper>
  );
};

export default SteamerPage;

const SteamerPageWrapper = styled(ColumnWrapper)`
  align-items: center;
`;
