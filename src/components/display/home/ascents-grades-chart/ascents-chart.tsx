import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import styled from "styled-components";

const AscentsChart = () => {
  const chartOptions = {
    chart: {
      type: "column",
      backgroundColor: null,
      style: {
        fontWeight: 500,
        fontFamily: "Roboto",
        color: "#ccd0d9",
      },
      height: 280,
    },
    plotOptions: {
      stacking: "normal",
      column: {
        pointPadding: 0.1,
        borderWidth: 0.5,
        borderColor: "#808593",
        color: "#93C572",
        borderRadius: "15%",
      },
    },
    title: {
      text: null,
    },
    xAxis: {
      lineWidth: 1,
      lineColor: "#808593",
      gridLineColor: "#808593",
      gridLineWidth: "1px",
      type: "category",
      categories: ["V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8"],
      labels: {
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
        text: "No. of ascents",
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
      data: [50, 50, 40, 40, 30, 15, 6],
    },
  };

  return (
    <ChartWrapper>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ChartWrapper>
  );
};

export default AscentsChart;

const ChartWrapper = styled.div`
  max-width: 100%;
  max-height: 350px;
  .chart-inner {
    width: 100%;
    max-height: 350px;
  }
`;
