import Details from "@/pages/Details";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import Home from "@/pages/Home";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Admin from "@/pages/admin/Admin";
import Tracking from "@/pages/logistics/Tracking";
import Logistics from "@/pages/logistics/Logistics";

const home: RouteObject = {
  index: true,
  element: <Home />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [{ name: "Home", href: "/" }],
      },
    };
  },
};
const details: RouteObject = {
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
};
const admin: RouteObject = {
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
};
const tracking: RouteObject = {
  path: "tracking",
  element: <Tracking />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Logística", href: "/logistics" },
          { name: "Rastreamento", href: "/logistics/tracking" },
        ],
      },
    };
  },
};
const logistics: RouteObject = {
  path: "logistics",
  element: <Logistics />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Logística", href: "/logistics" },
        ],
      },
    };
  },
  children: [tracking],
};
const login: RouteObject = { path: "login", element: <Login /> };
const notFound: RouteObject = { path: "*", element: <NotFound /> };
//--------------------------------------------------------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [home, details, admin, logistics],
  },
  login,
  notFound,
]);

export default router;
