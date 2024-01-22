import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useContext, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../../../../../App";

type PropsType = {
  chartOptions: {
    options: {
      yAxisType: string;
    };
    data: {
      name: string;
      color: string;
      data: number[][];
    }[];
  };
};

const TemperatureTimeChart = (props: PropsType) => {
  const { theme } = useContext(DataContext);
  const { chartOptions } = props;

  function buildDateTimeLabels(input: {
    value: number;
    tickPositionInfo: { unitName: string };
  }) {
    const tickDate = new Date(input.value);
    const timeCategory = input.tickPositionInfo.unitName;

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const nth = (d: any) => {
      if (d > 3 && d < 21) return `${d}th`;
      switch (d % 10) {
        case 1:
          return `${d}st`;
        case 2:
          return `${d}nd`;
        case 3:
          return `${d}rd`;
        default:
          return `${d}th`;
      }
    };

    let hour = tickDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const day = nth(tickDate.getDate());
    const month = monthNames[tickDate.getMonth()];
    const year = tickDate.getFullYear();

    // Helper function to generate label HTML
    const createLabelHtml = (
      content: { fontSize: string; color: string; text: string | number }[]
    ) => {
      return `<div style="display: flex; flex-direction: column; justify-content: center;">
        ${content
          .map(
            (item) =>
              `<span style="display: flex; justify-content: center; font-size: ${item.fontSize}; color: ${item.color};">${item.text}</span>`
          )
          .join("")}
      </div>
      `;
    };

    switch (timeCategory) {
      case "year":
        return createLabelHtml([
          { fontSize: "18px", color: theme.colors.primaryWhite, text: year },
        ]);
      case "month":
        return createLabelHtml([
          { fontSize: "18px", color: theme.colors.primaryWhite, text: month },
          { fontSize: "14px", color: theme.colors.primaryWhite, text: year },
        ]);
      case "week":
      case "day":
        return createLabelHtml([
          { fontSize: "14px", color: theme.colors.primaryWhite, text: month },
          { fontSize: "18px", color: theme.colors.primaryWhite, text: day },
        ]);
      case "hour":
        return createLabelHtml([
          { fontSize: "14px", color: theme.colors.primaryWhite, text: day },
          { fontSize: "14px", color: theme.colors.primaryWhite, text: hour },
        ]);
      default:
        return ""; // Default case for unexpected timeCategory values
    }
  }

  function buildYAxisLabels(input: {
    value: number;
    tickPositionInfo: { unitName: string };
  }) {
    if (chartOptions.options.yAxisType === "temperature") {
      return `<span>
      ${input.value}${"\u00b0"}
    </span>`;
    } else if (chartOptions.options.yAxisType === "PPM") {
      return `<span>
      ${input.value} PM2.5
    </span>`;
    } else if (chartOptions.options.yAxisType === "percentage") {
      return `<span>
      ${input.value} PPM
    </span>`;
    }
  }

  const options = {
    chart: {
      type: "line",
      zoomType: "x",
      plotBorderColor: "#808593",
      plotBorderWidth: 1,
      borderRadius: 5,
      backgroundColor: null,
      style: {
        fontWeight: 500,
        fontFamily: "Roboto",
        color: "#ccd0d9",
      },
      height: 400,
    },
    title: {
      text: null,
    },
    xAxis: {
      type: "datetime",
      labels: {
        visible: true,
        useHTML: true,
        formatter: function () {
          const input: any = this;
          const label = buildDateTimeLabels(input);
          return label;
        },
      },
      dateTimeLabelFormats: {
        day: "%b %e '%y",
        week: "%b %e '%y",
        month: "%b '%y",
        year: "%y",
      },
      gridLineWidth: "1px",
      gridLineColor: "#808593",
    },
    yAxis: {
      gridLineColor: "#808593",
      title: {
        visible: false,
        text: undefined,
        margin: 20,
        style: {
          color: theme.colors.primaryWhite,
          fontSize: 16,
          fontWeight: 500,
          fontFamily: "Roboto",
        },
      },
      labels: {
        formatter: function () {
          const input: any = this;
          const label = buildYAxisLabels(input);
          return label;
        },
        style: {
          color: theme.colors.primaryWhite,
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
      enabled: true,
      // reversed: true,
      itemStyle: {
        fontSize: 18,
        fontWeight: 400,
        color: theme.colors.primaryWhite,
      },
    },
    series: chartOptions.data,
  };

  return (
    <ChartWrapper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartWrapper>
  );
};

export default TemperatureTimeChart;

const ChartWrapper = styled.div`
  max-width: 100%;
  max-height: 370px;
  .chart-inner {
    width: 100%;
    max-height: 350px;
  }
  .highcharts-plot-background {
    border-radius: 5px;
  }
`;
