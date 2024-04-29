/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
//Using "Chart.js" package for graph.
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "chartjs-adapter-moment";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  CategoryScale,
  registerables,
} from "chart.js";

ChartJS.register(
  ...registerables,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  CategoryScale
);

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRadio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem: { value: any }, data: any) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: {
      type: "time",
      time: {
        format: "MM/DD/YY",
        tootipFormat: "ll",
      },
    },
    yAxes: {
      gridLines: {
        display: false,
      },
      ticks: {
        //Include a dollar sign in the ticks
        callback: function (value: any, index: any, values: any) {
          return numeral(value).format("0a");
        },
      },
    },
  },
};

const LineGraph = ({ casesType, country, ...args }) => {
  const [data, setData] = useState({});

  const buildChartData = (
    data: { [x: string]: { [x: string]: any }; cases: any },
    casesType: string | number
  ) => {
    // console.log("graph data - ", data.cases);
    const chartData = [];
    let previousData;
    for (const date in data.cases) {
      if (previousData && data[casesType][date] > previousData) {
        const newData = {
          x: date,
          y: data[casesType][date] - previousData,
        };
        chartData.push(newData);
      } else {
        const newData = {
          x: date,
          y: previousData - data[casesType][date],
        };
        chartData.push(newData);
      }
      previousData = data[casesType][date];
    }
    return chartData;
  };

  //End point - https://disease.sh/v3/covid-19/historical/all?lastdays=120
  useEffect(() => {
    if (country === "Worldwild") {
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
        .then((response) => response.json())
        .then((data) => {
          setData(buildChartData(data, casesType));
        });
    } else {
      fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
        .then((response) => response.json())
        .then((data) => {
          setData(buildChartData(data.timeline, casesType));
        });
    }
  }, [casesType, country]);

  const casesTypeColors = {
    cases: {
      backgroundColor: "#E95C5F",
      bordercolor: "#000000",
    },
    recovered: {
      backgroundColor: "#57C07F",
      bordercolor: "#000000",
    },
    deaths: {
      backgroundColor: "#B82925",
      bordercolor: "#000000",
    },
  };

  return (
    <div className={args.className}>
      {data?.length > 0 && (
        <Line
          className="lingGraph"
          className={args.className}
          options={options}
          data={{
            datasets: [
              {
                label: "Total cases",
                backgroundColor: "#ffb0b0",
                borderColor: "#ff4b5c",
                data: data,
              },
            ],
          }}
        ></Line>
      )}
    </div>
  );
};

export default LineGraph;
