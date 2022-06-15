import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { datasetsLine } from "../../data";
import dynamic from "next/dynamic";

const seriesDefault = [
  {
    name: datasetsLine[0].label,
    data: datasetsLine[0].data.map((item) => item.value),
  },
  {
    name: datasetsLine[1].label,
    data: datasetsLine[1].data.map((item) => item.value),
  },
];

const options: ApexOptions = {
  chart: {
    type: "line",
  },
  colors: ["rgb(255, 99, 132)", "rgb(53, 162, 235)"],
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: datasetsLine[0].data.map((item) => item.label),
  },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return (
        '<div class="arrow_box">' +
        "<span>" +
        series[seriesIndex][dataPointIndex] +
        "</span>" +
        "</div>"
      );
    },
  },
};

const LineApexcharts = () => {
  const [series, setSeries] = useState(seriesDefault);

  useEffect(() => {
    setTimeout(() => {
      const newSeries = [...seriesDefault];
      newSeries[0] = {
        ...newSeries[0],
        data: datasetsLine[0].data.map((item) => item.value + 100),
      };

      setSeries(newSeries);
    }, 2000);
  }, [setSeries]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};

export default LineApexcharts;
