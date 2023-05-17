import { createBrowserRouter, RouteObject } from "react-router-dom";
import {
  Customers,
  NewCustomer,
  UpdateCustomer,
  LayoutCustomers,
} from "@/pages/index";

export const newCustomer: RouteObject = {
  path: "new",
  element: <NewCustomer />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Clientes", href: "/customers" },
          { name: "Novo", href: "/customers/new" },
        ],
      },
    };
  },
};

export const updateCustomer: RouteObject = {
  path: "update/:id",
  element: <UpdateCustomer />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Clientes", href: "/customers" },
          { name: "Atualizar", href: "/users/update" },
        ],
      },
    };
  },
};

export const customers: RouteObject = {
  index: true,
  element: <Customers />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Clientes", href: "/customers" },
        ],
      },
    };
  },
};

export const layoutCustomers: RouteObject = {
  path: "customers",
  element: <LayoutCustomers />,
  children: [customers, newCustomer, updateCustomer],
};

export default { customers, newCustomer, updateCustomer, layoutCustomers };
