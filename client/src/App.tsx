import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import React from "react";
import { CookiesProvider } from "react-cookie";
import Theme from "./components/Theme";
import GlobalStyle from "./globalStyle";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const pages = new Map();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async ({ request, params }) => {
          return {
            breadcrumb: {
              routes: [{ name: "Home", href: "/" }],
            },
          };
        },
      },
      {
        path: "details",
        element: <Details />,
        loader: async ({ request, params }) => {
          return {
            breadcrumb: {
              routes: [
                { name: "Home", href: "/" },
                { name: "Details", href: "/details" },
              ],
            },
          };
        },
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <React.StrictMode>
      <CookiesProvider>
        <Theme>
          <RouterProvider router={router} />
        </Theme>
        <GlobalStyle />
      </CookiesProvider>
    </React.StrictMode>
  );
}

export default App;
