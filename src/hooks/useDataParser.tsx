import { useCallback, useEffect, useState } from "react";

type OptionsType = {
  includeHistorical: boolean;
  probeTypesToInclude: string[];
};

const useDataParser = (
  data: any,
  dataError: boolean,
  dataLoading: boolean,
  options: OptionsType
) => {
  const [parsedData, setParsedData] = useState<any>({});

  const getMeasurementFromRawData = useCallback(() => {
    const { includeHistorical } = options;
    /*Initializing the return object*/
    console.log(data.data);
    const newParsedData = data.data.controllers.reduce(
      (accum: any, controller: any) => {
        const probe = controller.probes[0];
        if (!options.probeTypesToInclude.includes(probe.probe_type))
          return accum;
        if (!accum.hasOwnProperty(probe.probe_type)) {
          accum[probe.probe_type] = {};
        }
        let measurements = [];
        if (includeHistorical) {
          measurements = probe.measurements;
        } else {
          measurements = [probe.measurements[0]];
        }

        accum[probe.probe_type][controller.controller_name] = {
          type: probe.probe_type,
          measurements: measurements,
        };
        return accum;
      },
      {}
    );
    console.log(newParsedData);
    //   data.data.controllers.forEach((controller: any) => {});
    return newParsedData;
  }, [data, options]);

  useEffect(() => {
    let response: any = {};
    if (!dataLoading && !dataError && data.hasOwnProperty("data")) {
      if (data.data) {
        response = getMeasurementFromRawData();
      }
    }
    if (Object.keys(response).length > 0) {
      setParsedData(response);
    }
  }, [data, dataError, dataLoading, getMeasurementFromRawData, options]);
  return { parsedData };
};

export default useDataParser;
