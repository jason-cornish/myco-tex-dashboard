import { useCallback, useEffect, useMemo, useState } from "react";

const useTimeRangeFilter = (unfilteredData: any, timeRange: any) => {
  const [filteredData, setFilteredData] = useState<any>({});

  const now = Math.round(new Date().getTime() / 1000);

  const timeRangeMapping: any = useMemo(() => {
    return {
      "Last 24 hours": {
        fromDate: now - 24 * 3600,
      },
      "Last 7 days": {
        fromDate: now - 7 * 86400,
      },
      "Last 30 days": {
        fromDate: now - 30 * 86400,
      },
      "Last 90 days": {
        fromDate: now - 30 * 86400,
      },
    };
  }, [now]);

  const applyFiltering = useCallback(() => {
    const localFilteredData = Object.keys(unfilteredData).reduce(
      (accum: any, probe: any) => {
        accum[probe] = unfilteredData[probe].measurements.filter(
          (measurement: any) => {
            return (
              Math.round(
                new Date(measurement.measure_created_at).getTime() / 1000
              ) > timeRangeMapping[timeRange].fromDate
            );
          }
        );
        return accum;
      },
      {}
    );
    return localFilteredData;
  }, [timeRange, timeRangeMapping, unfilteredData]);

  useEffect(() => {
    if (Object.keys(unfilteredData).length === 0) return;
    const localFilteredData = applyFiltering();
    setFilteredData(localFilteredData);
  }, [unfilteredData, applyFiltering, timeRange]);
  return { filteredData };
};

export default useTimeRangeFilter;
