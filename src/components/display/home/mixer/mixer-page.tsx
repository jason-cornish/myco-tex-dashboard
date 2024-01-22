import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import MixerBlueprint from "./mixer-blueprint";
import { useMemo, useState } from "react";
import { MixerDataType } from "./types";
import LiveConection from "../live-connection";

const MixerPage = () => {
  const [hasLiveConnection, setHasLiveConnection] = useState(true);
  const mixerData: MixerDataType = useMemo(() => {
    return {
      humidity: 10,
    };
  }, []);

  return (
    <MixerPageWrapper>
      <SectionTitleWrapper>
        <SectionTitle>Live Mixer Data</SectionTitle>
        <LiveConection
          hasLiveConnection={hasLiveConnection}
          setHasLiveConnection={setHasLiveConnection}
        />
      </SectionTitleWrapper>
      <MixerBlueprint data={mixerData} />
    </MixerPageWrapper>
  );
};

export default MixerPage;

const MixerPageWrapper = styled(ColumnWrapper)`
  row-gap: 10px;
`;

const SectionTitleWrapper = styled(RowWrapper)`
  column-gap: 10px;
  align-items: center;
`;

const SectionTitle = styled.h1`
  color: ${(props) => props.theme.colors.grey} !important;
`;
