import { createBrowserRouter, RouteObject } from "react-router-dom";

import { layoutLogistics } from "./logistics";
import { details } from "./details";
import { admin } from "./admin";
import { layoutUsers } from "./users";
import { layoutCustomers } from "./customers";
import { Home, Layout, Login, NotFound, Signup } from "@/pages/index";

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
      details,
      admin,
      layoutLogistics,
      layoutUsers,
      layoutCustomers,
    ],
  },
  login,
  signup,
  notFound,
]);

export default router;
