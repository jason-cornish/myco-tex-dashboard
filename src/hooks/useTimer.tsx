import { useEffect, useState } from "react";

export const useTimer = (timeInterval: number) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, timeInterval);

    return () => clearInterval(interval);
  }, [timeInterval]);

  return time;
};
