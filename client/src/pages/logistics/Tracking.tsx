import Breadcrumb from "@/components/Breadcrumb";
import GoogleMap from "@/components/map/GoogleMap";
import styled from "styled-components";

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

function Tracking() {
  return (
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
        <div style={{ width: "100%", height: "20rem", color: "#000" }}>
          aaaaaaa
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GoogleMap width="100%" height="600px" />
        </div>
      </div>
    </>
  );
}

export default Tracking;
