import styled from "styled-components";
import {
  ColumnWrapper,
  RowWrapper,
} from "../../../../reusable/styled-components";
import { LiveLabDataType } from "./types";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import LabBlueprint from "./lab-blueprint";
import LiveConection from "../live-connection";
import { HistoricalDataType, LiveReadingType } from "../types";
import TemperatureTimeChart from "../charts/temps-over-time/temp-time-chart";
import { useTimer } from "../../../../hooks/useTimer";
import { HomeContext } from "../home";
import { DataContext } from "../../../../App";

const LabPage = () => {
  const { userProfile, APIURL } = useContext(DataContext);
  const { availableTabs, fetchFromAPI, reportDataAvailable } =
    useContext(HomeContext);
  const [historicalData, setHistoricalData] = useState<HistoricalDataType>([
    { name: "Temp #1", color: "#93C572", data: [] },
    { name: "Temp #2", color: "#a472c5", data: [] },
  ]);

  const [historicalTimeRange, setHistoricalTimeRange] = useState();
  const [liveTemperature, setLiveTemperature] = useState<LiveReadingType>({
    lastUpdated: 0,
    value: 0,
  });
  const [livePPM, setLivePPM] = useState<LiveReadingType>({
    lastUpdated: 0,
    value: 0,
  });
  const time = useTimer(1000);
  const liveLabData: LiveLabDataType = useMemo(() => {
    return {
      temp1: 71,
      temp2: 71,
      temp3: 71,
      temp4: 71,
      ppm: 1000,
    };
  }, []);

  const hasLiveConnection = useMemo(() => {
    if (!liveTemperature.lastUpdated || !liveTemperature.value) return false;
    const secondDifference = time - liveTemperature.lastUpdated;
    if (liveTemperature.lastUpdated >= time || secondDifference <= 2000)
      return true;
    return false;
  }, [liveTemperature, time]);

  useEffect(() => {
    (async () => {
      if (
        !availableTabs.hasOwnProperty("Lab") ||
        !reportDataAvailable ||
        !userProfile.authToken
      ) {
        return;
      }

      const options = {
        url: `${APIURL}/api/measure/${availableTabs.Lab.room_id}/false`,
        method: "GET",
        headers: {
          "x-access-token": userProfile.authToken,
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      };

      const res = await fetchFromAPI(options);
      let liveTemperatureResponse: any = false;
      let livePPMResponse: any = false;
      try {
        res.controllers.forEach((controller: any) => {
          const probe = controller.probe[0];
          if (probe.probe_type === "ppm") {
            livePPMResponse = probe.measurements[0];
          } else if (probe.probe_type === "therm") {
            liveTemperatureResponse = probe.measurements[0];
          }
        });
      } catch {
        liveTemperatureResponse = false;
        livePPMResponse = false;
      }
      if (liveTemperatureResponse) {
        setLiveTemperature({
          value: liveTemperatureResponse.measure,
          lastUpdated: liveTemperatureResponse["measure_created_at"] * 1000,
        });
      }
      if (livePPMResponse) {
        setLivePPM({
          value: livePPMResponse.measure,
          lastUpdated: livePPMResponse["measure_created_at"] * 1000,
        });
      }
    })();
  }, [
    APIURL,
    availableTabs,
    fetchFromAPI,
    reportDataAvailable,
    userProfile.authToken,
    time,
  ]);

  const fetchHistoricalData = useCallback(() => {
    const fetchedHistoricalData = [
      {
        name: "PPM",
        color: "#93C572",
        data: [
          [1253453834, 10],
          [1332648499, 29],
          [1402658481, 49],
          [1512658481, 79],
          [1653516428, 90],
          [1702658481, 100],
          [1802658481, 110],
          [1912658481, 105],
        ],
      },
    ];
    setHistoricalData(fetchedHistoricalData);
  }, [historicalTimeRange]);

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  const chartOptions = useMemo(() => {
    return {
      options: { yAxisType: "PPM" },
      data: historicalData,
    };
  }, [historicalData]);

  return (
    <LabPageWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>Live Lab Data</SectionTitle>
          <LiveConection hasLiveConnection={hasLiveConnection} />
        </SectionTitleWrapper>
        <LabBlueprint
          liveData={{ temp1: liveTemperature.value, ppm: livePPM.value }}
        />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle>PPM Over Time</SectionTitle>
        </SectionTitleWrapper>
        <ChartWrapper>
          <TemperatureTimeChart chartOptions={chartOptions} />
        </ChartWrapper>
      </SectionWrapper>
    </LabPageWrapper>
  );
};

export default LabPage;

const LabPageWrapper = styled(ColumnWrapper)`
  row-gap: 25px;
`;

const ChartWrapper = styled(ColumnWrapper)`
  padding-top: 10px;
  margin-left: -10px;
`;

const SectionTitleWrapper = styled(RowWrapper)`
  column-gap: 10px;
  align-items: center;
`;

const SectionTitle = styled.h1`
  font-size: 24px !important;
  color: ${(props) => props.theme.colors.grey} !important;
`;

const SectionWrapper = styled(ColumnWrapper)`
  row-gap: 10px;
`;
