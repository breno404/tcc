import React, { useEffect, useState } from "react";
import AdminPanel from "../components/AdminPanel";
import Breadcrumb from "../components/Breadcrumb";

function Home() {
  return (
    <>
      <Breadcrumb />
      <AdminPanel />
      <div
        style={{
          border: "2px solid black",
          borderRadius: "1.2rem",
        }}
      ></div>
    </>
  );
}

export default Home;
