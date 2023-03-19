import { memo, useRef } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import styled from "styled-components";
import { ChartData } from "chart.js/auto";

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

function RadarChart() {
  const ref = useRef();

  const data: ChartData<"radar", number[], unknown> = {
    labels: ["S", "A", "A", "B", "A", "C"],
    datasets: [
      {
        label: "Março",
        data: [98, 82, 75, 68, 77, 50],
        fill: true,
      },
    ],
  };

  const options = {};

  return (
    <Style>
      <Chart
        type="radar"
        data={data}
        ref={ref}
        options={{
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

                  return [
                    `${model.dataset.label}: ${model.formattedValue}`,
                    ...h,
                  ];
                },
              },
            },
            colors: { forceOverride: true },
          },
        }}
      />
    </Style>
  );
}

export default memo(RadarChart);
