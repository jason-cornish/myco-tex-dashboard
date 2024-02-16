import { useContext, useEffect, useMemo, useState } from "react";
import { HomeContext } from "../components/display/home/home";
import { DataContext } from "../App";

export const useChartDataFormatter = (data: any, probeType: string) => {
  const { userProfile } = useContext(DataContext);
  const { availableTabs, reportDataAvailable } = useContext(HomeContext);
  const [formattedData, setFormattedData] = useState(false);

  const colors = useMemo(() => {
    return ["#93C572", "#00A3C0"];
  }, []);

  useEffect(() => {
    let localFormattedData: any = {
      data: [],
      series: probeType,
      color: colors[0],
      name: probeType,
    };
    if (data.hasOwnProperty(probeType)) {
      console.log(data);
      localFormattedData.data = Object.keys(data[probeType]).map(
        (measurement) => {
          const measurementValues = data[probeType][measurement];
          return [
            measurementValues.measure_created_at * 1000,
            measurementValues.measure,
          ];
        }
      );
    }
    setFormattedData(localFormattedData);
  }, [colors, data, probeType]);

  return formattedData;
};
