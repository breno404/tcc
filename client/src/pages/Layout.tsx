import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import SideBar from "../components/SideBar";

function Layout(): JSX.Element {
  return (
    <div
      className=""
      style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <Header title="Home" />
      <section style={{ display: "flex", width: "100%" }}>
        <SideBar />
        <Main>
          <article style={{ width: "100%", padding: "1rem" }}>
            <Outlet />
          </article>
          <Footer />
        </Main>
      </section>
    </div>
  );
}

export default Layout;
