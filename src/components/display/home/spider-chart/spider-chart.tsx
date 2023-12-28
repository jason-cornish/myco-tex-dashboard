import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import { useState } from "react";
import styled from "styled-components";

HighchartsMore(Highcharts);

const SpiderChart = () => {
  const chartOptions = {
    chart: {
      polar: true,
      type: "area",
      backgroundColor: null,
      style: {
        fontWeight: 500,
        fontFamily: "Roboto",
        color: "#ccd0d9",
      },
      height: 300,
    },
    pane: {
      size: "80%",
    },
    // plotOptions: {
    //   stacking: "normal",
    //   column: {
    //     pointPadding: 0.1,
    //     borderWidth: 0.5,
    //     borderColor: "#808593",
    //     color: "#aab1c0",
    //     borderRadius: "15%",
    //   },
    // },
    title: {
      text: null,
    },
    xAxis: {
      tickmarkPlacement: "on",
      lineWidth: 0,
      lineColor: "#808593",
      gridLineColor: "#808593",
      gridLineWidth: "1px",
      categories: ["Crimps", "Slopers", "Pinches", "Jugs", "Pockets"],
      labels: {
        style: {
          color: "#ccd0d9",
          fontSize: 16,
          fontWeight: 500,
          fontFamily: "Roboto",
        },
      },
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      gridLineColor: "#808593",
      lineWidth: 0,
      min: 0,
      title: {
        text: null,
        margin: 20,
        style: {
          color: "#ccd0d9",
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "Roboto",
        },
      },
      labels: {
        style: {
          color: "#ccd0d9",
          fontSize: 14,
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
    series: [
      {
        color: "#93C572",
        name: "Ascents",
        data: [10, 1, 1, 8, 2],
        pointPlacement: "on",
      },
    ],
  };

  return (
    <ChartWrapper>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ChartWrapper>
  );
};

export default SpiderChart;

const ChartWrapper = styled.div`
  max-width: 600px;
  max-height: 350px;
  .chart-inner {
    max-height: 300px;
  }
`;
