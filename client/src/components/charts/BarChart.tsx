import { memo, useRef } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import styled from "styled-components";
import { ChartData, ChartOptions } from "chart.js/auto";

const Style = styled.div`
  margin-top: 2rem;
  margin-left: 2rem;
  margin-right: 0;
  margin-bottom: 0;
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  justify-content: center;
  width: 500px;
  height: 300px;
  padding: 2rem;
  color: #000000;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

function BarChart() {
  const ref = useRef();

  const data: ChartData<"bar", number[], string> = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    aspectRatio: 1,
    responsive: true,
    normalized: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "right" },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: function (models) {
            return models[0].label;
          },
          label: function (model) {
            const h = data.datasets
              .filter(({ hidden }) => hidden === true)
              .map(
                ({ label, data: value }) =>
                  `${label}: ${value[model.dataIndex]}`
              );

            return [`${model.dataset.label}: ${model.formattedValue}`, ...h];
          },
        },
      },
      colors: { forceOverride: true },
    },
  };

  return (
    <Style>
      <Chart type="bar" data={data} ref={ref} options={options} />
    </Style>
  );
}

export default memo(BarChart);
