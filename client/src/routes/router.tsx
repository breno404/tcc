import { createBrowserRouter, RouteObject } from "react-router-dom";

import { layoutLogistics } from "./logistics";
import { details } from "./details";
import { admin } from "./admin";
import { layoutUsers } from "./users";
import { layoutCustomers } from "./customers";
import { layoutSuppliers } from "./suppliers";
import {
  Home,
  Inventory,
  Layout,
  Login,
  NotFound,
  Signup,
} from "@/pages/index";

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

const inventory: RouteObject = {
  element: <Inventory />,
  path: "inventory",
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Estoque", href: "/inventory" },
        ],
      },
    };
  },
};

const login: RouteObject = { path: "login", element: <Login /> };
const signup: RouteObject = { path: "signup", element: <Signup /> };
const notFound: RouteObject = { path: "*", element: <NotFound /> };
//--------------------------------------------------------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      home,
      inventory,
      details,
      admin,
      inventory,
      layoutLogistics,
      layoutUsers,
      layoutCustomers,
      layoutSuppliers,
    ],
  },
  login,
  signup,
  notFound,
]);

export default router;
