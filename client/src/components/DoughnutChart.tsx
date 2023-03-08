import { useRef } from "react";
import { Doughnut, ChartProps, Chart } from "react-chartjs-2";
import "chart.js/auto";
import styled from "styled-components";
import { ChartData, ChartOptions } from "chart.js/auto";
import randomColor from "@/helpers/randomHexColors";
import convert from "@/helpers/convertColor";

const Style = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  height: 300px;
  padding: 2rem;
  color: #000000;
  border: 1px solid black;
`;

function PieChart() {
  const ref = useRef();

  const a = convert.toRGB(randomColor());
  const b = convert.toRGB(randomColor());
  const data: ChartData<"doughnut", number[], string> = {
    labels: [
      "M. Franco",
      "B. Fagundes",
      "J. Domingues",
      "L. Antônio",
      "M. Silva",
      "B. Aguiar",
    ],
    datasets: [
      {
        label: "Vendas",
        data: [33, 53, 85, 41, 44, 65],
        backgroundColor: `rgba(${a.r},${a.g},${a.b},0.2)`,
        borderColor: `rgba(${a.r},${a.g},${a.b},1)`,
      },
      {
        label: "Meta",
        hidden: false,
        data: [33, 53, 85, 41, 44, 65],
        backgroundColor: `rgba(${b.r},${b.g},${b.b},0.2)`,
        borderColor: `rgba(${b.r},${b.g},${b.b},1)`,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    aspectRatio: 1,
    responsive: true,
    radius: "100%",
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
    },
  };

  return (
    <Style>
      <Chart type="doughnut" data={data} ref={ref} options={options} />
    </Style>
  );
}

export default PieChart;
