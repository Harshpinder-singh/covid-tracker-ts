import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

interface LineGraphProps {
  countries?: any[];
  casesType?: string;
}

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem: { [k: string]: any }, data: {}) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value: number) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
const LineGraph: React.FC<LineGraphProps> = ({
  countries,
  casesType = "cases",
}) => {
  const [data, setData] = useState<{ [k: string]: any }>({});

  const buildChartData = (data: any, casesType: string) => {
    const chartData: any[] = [];
    let lastDataPoint: number | null = null;

    for (let date in data[casesType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }

    return chartData;
  };
  useEffect(() => {
    const getChart = async () => {
      const res = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=10"
      );

      const data = await res.json();

      const chartData = buildChartData(data, casesType);
      console.log(chartData);
      setData(chartData);
    };
    getChart();
  }, [casesType]);

  return (
    <div className="">
      {data && data.length && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.6)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default LineGraph;
