import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import { LiveSteamerDataType } from "./types";
import { useMemo, useState } from "react";
import SteamerBlueprint from "./steamer-blueprint";
import LiveConection from "../live-connection";
import Button from "../../../../reusable/button";

const SteamerPage = () => {
  const [hasLiveConnection, setHasLiveConnection] = useState(true);
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
      <SectionTitleWrapper>
        <SectionTitle>Live Steamer Data</SectionTitle>
        <LiveConection
          hasLiveConnection={hasLiveConnection}
          setHasLiveConnection={setHasLiveConnection}
        />
      </SectionTitleWrapper>
      <Button
        type="fancy"
        text="Configure new sensor"
        icon={false}
        color={false}
        onClick={() => {}}
      />
      <SteamerBlueprint liveData={liveSteamerData} />
    </SteamerPageWrapper>
  );
};

export default SteamerPage;

const SteamerPageWrapper = styled(ColumnWrapper)``;

const SectionTitleWrapper = styled(RowWrapper)`
  column-gap: 10px;
  align-items: center;
`;

const SectionTitle = styled.h1`
  color: ${(props) => props.theme.colors.grey} !important;
`;
