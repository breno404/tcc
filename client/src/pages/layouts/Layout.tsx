import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import AccountProvider from "@/components/providers/AccountProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import SideBar from "@/components/SideBar";

function Layout(): JSX.Element {
  const [cookies] = useCookies(["accessToken", "refreshToken", "user"]);

  const [user, setUser] = useState(cookies.user);
  const [accessToken, setAccessToken] = useState(cookies.accessToken);
  const [refreshToken, setRefreshToken] = useState(cookies.refreshToken);

  const [sideBarOpen, setSideBarOpen] = useState(true);

  useMemo(() => {
    return () => {
      if (!cookies) {
        setUser(undefined);
        setAccessToken(undefined);
        setRefreshToken(undefined);
      }
    };
  }, [cookies]);

  return (
    <AccountProvider account={{ user, accessToken, refreshToken }}>
      <div
        className=""
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Header
          title="Smart $ales"
          onClick={() => setSideBarOpen(!sideBarOpen)}
        />
        <section style={{ display: "flex", width: "100%" }}>
          <SideBar open={sideBarOpen} />
          <Main>
            <article style={{ width: "100%", padding: "1rem" }}>
              <Outlet />
            </article>
            <Footer />
          </Main>
        </section>
      </div>
    </AccountProvider>
  );
}

export default Layout;
