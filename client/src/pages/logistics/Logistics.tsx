import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Logistics() {
  const router = useLocation();
  const [isMainLogisticsRoute, setIsMainLogisticsRoute] = useState<boolean>(
    router.pathname == "/logistics"
  );

  return (
    <>
      {isMainLogisticsRoute ? (
        <>
          <Breadcrumb />
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
              asdasdasd
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Logistics;
