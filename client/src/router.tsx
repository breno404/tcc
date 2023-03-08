import Details from "@/pages/Details";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import Admin from "@/pages/Admin";

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
      {
        path: "admin",
        element: <Admin />,
        loader: async ({ request, params }) => {
          return {
            breadcrumb: {
              routes: [
                { name: "Home", href: "/" },
                { name: "Administrator", href: "/admin" },
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

export default router;
