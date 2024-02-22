import { useContext, useEffect, useMemo, useState } from "react";
import { HomeContext } from "../components/display/home/home";
import { DataContext } from "../App";

type DataType = {
  [key: string]: {
    measurements: [
      {
        measure: number;
        measure_created_at: number;
        measure_id: string;
      }
    ];
    type: string;
  };
};

type ProbeType = {
  measurements: {
    measure: number;
    measure_created_at: number;
    measure_id: string;
  };
  type: string;
};

export const useChartDataFormatter = (data: DataType, probeType: string) => {
  const { userProfile } = useContext(DataContext);
  const { availableTabs, reportDataAvailable } = useContext(HomeContext);
  const [formattedData, setFormattedData] = useState(false);

  const colors = useMemo(() => {
    return ["#93C572", "#00A3C0"];
  }, []);

  useEffect(() => {
    // let localFormattedData: any = [];
    console.log(data);
    const localFormattedData: any = Object.keys(data).reduce(
      (series: any, probe: any) => {
        const seriesObject = {
          series: probe,
          name: probe,
          data: data[probe].measurements.map((measurement) => {
            return [
              Math.round(new Date(measurement.measure_created_at).getTime()),
              Math.round(measurement.measure),
            ];
          }),
        };
        series.push(seriesObject);
        return series;
      },
      []
    );
    // if (data.hasOwnProperty(probeType)) {
    //   const
    //   const probeSeries = {
    //     data: [],
    //     series: probeType,
    //     color: colors[0],
    //     name: probeType,
    //   };
    //   localFormattedData.data = Object.keys(data[probeType]).map(
    //     (measurement) => {
    //       const measurementValues = data[probeType][measurement];
    //       return [
    //         measurementValues.measure_created_at * 1000,
    //         measurementValues.measure,
    //       ];
    //     }
    //   );
    // }
    setFormattedData(localFormattedData);
  }, [colors, data, probeType]);

  return formattedData;
};
