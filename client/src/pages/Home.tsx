import React, { useEffect, useRef, useState } from "react";
import AdminPanel from "@/components/AdminPanel";
import Breadcrumb from "@/components/Breadcrumb";
import PieChart from "@/components/PieChart";
import DoughnutChart from "@/components/DoughnutChart";
import AreaChart from "@/components/AreaChart";
import SimpleMap from "@/components/GoogleMaps";
import useWindowSize from "@/hooks/useWindowSize";

function Home() {
  const { width, height } = useWindowSize();

  return (
    <>
      <Breadcrumb />
      <AdminPanel />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          border: "2px solid black",
          borderRadius: "1.2rem",
        }}
      >
        <PieChart />
        <DoughnutChart />
        <AreaChart />
        <SimpleMap />
      </div>
    </>
  );
}

export default Home;
