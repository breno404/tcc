import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Users, NewUser, UpdateUser, LayoutUsers } from "@/pages/index";

export const newUser: RouteObject = {
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

export const updateUser: RouteObject = {
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

export const users: RouteObject = {
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

export const layoutUsers: RouteObject = {
  path: "users",
  element: <LayoutUsers />,
  children: [users, newUser, updateUser],
};

export default { users, newUser, layoutUsers, updateUser };
