import styled from "styled-components";
import { ColumnWrapper } from "../../../../reusable/styled-components";
import MixerBlueprint from "./mixer-blueprint";
import { useMemo } from "react";
import { MixerDataType } from "./types";

const MixerPage = () => {
  const mixerData: MixerDataType = useMemo(() => {
    return {
      humidity: 10,
    };
  }, []);

  return (
    <MixerPageWrapper>
      <MixerBlueprint data={mixerData} />
    </MixerPageWrapper>
  );
};

export default MixerPage;

const MixerPageWrapper = styled(ColumnWrapper)`
  align-items: center;
`;
