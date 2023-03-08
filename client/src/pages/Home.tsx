import React, { useEffect, useState } from "react";
import AdminPanel from "@/components/AdminPanel";
import Breadcrumb from "@/components/Breadcrumb";
import PieChart from "@/components/PieChart";
import DoughnutChart from "@/components/DoughnutChart";
import AreaChart from "@/components/AreaChart";

function Home() {
  return (
    <>
      <Breadcrumb />
      <AdminPanel />
      <div
        style={{
          display: "flex",
          border: "2px solid black",
          borderRadius: "1.2rem",
        }}
      >
        <PieChart />
        <DoughnutChart />
        <AreaChart />
      </div>
    </>
  );
}

export default Home;
