import { useRef } from "react";
import { Pie, ChartProps, Chart } from "react-chartjs-2";
import "chart.js/auto";
import styled from "styled-components";

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

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  return (
    <Style>
      <Chart
        type="pie"
        data={data}
        ref={ref}
        options={{
          aspectRatio: 1,
          responsive: true,
          radius: "100%",
          normalized: true,
          maintainAspectRatio: false,
        }}
      />
    </Style>
  );
}

export default PieChart;
