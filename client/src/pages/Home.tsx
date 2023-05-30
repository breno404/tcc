import AdminPanel from "@/components/AdminPanel";
import Breadcrumb from "@/components/Breadcrumb";
import DoughnutChart from "@/components/charts/DoughnutChart";
import AreaChart from "@/components/charts/RadarChart";
import BarChart from "@/components/charts/BarChart";
import Table from "@/components/Table";
import styled from "styled-components";

const Style = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  justify-content: center;
  border-radius: 1.2rem;

  & > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
    padding-right: 2rem;
    flex-shrink: 1;
  }
`;

function Home() {
  return (
    <>
      <Breadcrumb />
      {/* <AdminPanel /> */}
      <Style>
        <div>
          <BarChart />
          <DoughnutChart />
          <AreaChart />
          <Table
            datasets={[
              {
                label: "Data de venda",
                data: ["20/03/2023", "25/05/2023", "04/08/2023", "01/04/2023"],
              },
              {
                label: "Valor da venda",
                data: ["25.000,00", "48.876,00", "10.000,00", "5,00"],
              },
              {
                label: "Vendedor",
                data: [
                  "Juliana Moura",
                  "Luiz Ribeiro",
                  "Arnaldo Coelho",
                  "Julio Cocielo",
                ],
              },
            ]}
            onClickCallBack={function (value: any): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </Style>
    </>
  );
}

export default Home;
