type OptionsType = {
  includeHistorical: boolean;
};

export const getMeasurementFromRawData = (
  rawData: any,
  options: OptionsType
) => {
  const { includeHistorical } = options;
  /*Initializing the return object*/
  const data = rawData.controllers.reduce((accum: any, controller: any) => {
    const probe = controller.probes[0];

    let measurements = [];
    if (includeHistorical) {
      measurements = [probe.measurements];
    } else {
      measurements = [probe.measurements[0]];
    }

    accum[controller.controller_name] = {
      type: probe.probe_type,
      measurements: measurements,
    };
    return accum;
  }, {});
  rawData.controllers.forEach((controller: any) => {});

  return data;
};
