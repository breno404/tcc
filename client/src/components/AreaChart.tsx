import { useRef } from "react";
import { Doughnut, ChartProps, Chart } from "react-chartjs-2";
import "chart.js/auto";
import styled from "styled-components";
import { ChartData } from "chart.js/auto";

const Style = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  height: 300px;
  padding: 2rem;
  color: #000000;
  border: 1px solid black;
`;

function AreaChart() {
  const ref = useRef();

  const data: ChartData<"radar", number[], unknown> = {
    labels: ["S", "A", "A", "B", "A", "C"],
    datasets: [
      {
        label: "Março",
        data: [98, 82, 75, 68, 77, 50],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

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
        }}
      />
    </Style>
  );
}

export default AreaChart;
