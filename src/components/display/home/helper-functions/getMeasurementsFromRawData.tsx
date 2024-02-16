type OptionsType = {
  probeTypes: string[];
  includeHistorical: boolean;
};

export const getMeasurementFromRawData = (
  rawData: any,
  options: OptionsType
) => {
  const { includeHistorical, probeTypes } = options;
  console.log(rawData);
  const dataByProbeType: any = {};
  /*Initializing the return object*/
  [...probeTypes].forEach(
    (type) => (dataByProbeType[type] = { measure: false })
  );
  try {
    rawData.controllers.forEach((controller: any) => {
      const probe = controller.probes[0];

      if (probeTypes.includes(probe.probe_type)) {
        let measurements = [];
        if (includeHistorical) {
          measurements = probe.measurements;
        } else {
          measurements = probe.measurements[0];
        }
        if (dataByProbeType.hasOwnProperty(probe.probe_type)) {
          dataByProbeType[probe.probe_type] = measurements;
        }
      }
    });
  } catch {
    return false;
  }
  return dataByProbeType;
};
