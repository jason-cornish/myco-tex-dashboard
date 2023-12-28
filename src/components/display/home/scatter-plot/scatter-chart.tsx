import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import styled from "styled-components";

const ScatterChart = () => {
  const chartOptions = {
    chart: {
      type: "scatter",
      backgroundColor: null,
      style: {
        fontWeight: 500,
        fontFamily: "Roboto",
        color: "#ccd0d9",
      },
      height: 280,
    },
    title: {
      text: null,
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%Y-%b-%e}",
        style: {
          color: "#ccd0d9",
          fontSize: 18,
          fontWeight: 500,
          fontFamily: "Roboto",
        },
      },
    },
    yAxis: {
      gridLineColor: "#808593",
      title: {
        text: "Grade",
        margin: 20,
        style: {
          color: "#ccd0d9",
          fontSize: 16,
          fontWeight: 500,
          fontFamily: "Roboto",
        },
      },
      labels: {
        style: {
          color: "#ccd0d9",
          fontSize: 16,
          fontWeight: 500,
          fontFamily: "Roboto",
        },
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: {
      name: "Ascents",
      color: "#93C572",
      data: [
        [1693516428, 7],
        [1702658481, 2],
      ],
    },
  };

  return (
    <ChartWrapper>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ChartWrapper>
  );
};

export default ScatterChart;

const ChartWrapper = styled.div`
  max-width: 100%;
  max-height: 350px;
  .chart-inner {
    width: 100%;
    max-height: 350px;
  }
`;
