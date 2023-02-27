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
      >
        aaa
      </div>
    </>
  );
}

export default Home;
