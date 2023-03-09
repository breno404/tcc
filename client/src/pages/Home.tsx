import React from "react";
import AdminPanel from "@/components/AdminPanel";
import Breadcrumb from "@/components/Breadcrumb";
import PieChart from "@/components/charts/PieChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import AreaChart from "@/components/charts/RadarChart";
import SimpleMap from "@/components/GoogleMaps";

function Home() {
  return (
    <>
      <Breadcrumb />
      <AdminPanel />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "2rem",
          justifyContent: "center",
          border: "2px solid black",
          borderRadius: "1.2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "2rem",
            paddingRight: "2rem",
            flexShrink: 1,
          }}
        >
          <PieChart />
          <DoughnutChart />
          <AreaChart />
        </div>

        <SimpleMap />
      </div>
    </>
  );
}

export default Home;
