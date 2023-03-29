import Details from "@/pages/Details";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Layout from "@/pages/layouts/Layout";
import Home from "@/pages/Home";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Admin from "@/pages/admin/Admin";
import Tracking from "@/pages/logistics/Tracking";
import Logistics from "@/pages/logistics/Logistics";
import LayoutLogistics from "./pages/layouts/LayoutLogistics";
import Signup from "./pages/Signup";
import LayoutUsers from "./pages/layouts/LayoutUsers";
import NewUser from "./pages/users/NewUser";
import UpdateUser from "./pages/users/UpdateUser";
import Users from "./pages/users/Users";

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
  index: true,
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
};
const layoutLogistics: RouteObject = {
  path: "logistics",
  element: <LayoutLogistics />,
  children: [logistics, tracking],
};
const newUser: RouteObject = {
  path: "new",
  element: <NewUser />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Usuários", href: "/users" },
          { name: "Novo", href: "/users/new" },
        ],
      },
    };
  },
};
const updateUser: RouteObject = {
  path: "update/:id",
  element: <UpdateUser />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Usuários", href: "/users" },
          { name: "Atualizar", href: "/users/update" },
        ],
      },
    };
  },
};
const users: RouteObject = {
  index: true,
  element: <Users />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Usuários", href: "/users" },
        ],
      },
    };
  },
};
const layoutUsers: RouteObject = {
  path: "users",
  element: <LayoutUsers />,
  children: [users, newUser, updateUser],
};

const login: RouteObject = { path: "login", element: <Login /> };
const signup: RouteObject = { path: "signup", element: <Signup /> };
const notFound: RouteObject = { path: "*", element: <NotFound /> };
//--------------------------------------------------------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [home, details, admin, layoutLogistics, layoutUsers],
  },
  login,
  signup,
  notFound,
]);

export default router;
