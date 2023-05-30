import { createBrowserRouter, RouteObject } from "react-router-dom";
import {
  Suppliers,
  NewSupplier,
  UpdateSupplier,
  LayoutSuppliers,
} from "@/pages/index";

export const newSupplier: RouteObject = {
  path: "new",
  element: <NewSupplier />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Fornecedores", href: "/suppliers" },
          { name: "Novo", href: "/suppliers/new" },
        ],
      },
    };
  },
};

export const updateSupplier: RouteObject = {
  path: "update/:id",
  element: <UpdateSupplier />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Fornecedores", href: "/suppliers" },
          { name: "Atualizar", href: "/suppliers/update" },
        ],
      },
    };
  },
};

export const suppliers: RouteObject = {
  index: true,
  element: <Suppliers />,
  loader: async ({ request, params }) => {
    return {
      breadcrumb: {
        routes: [
          { name: "Home", href: "/" },
          { name: "Fornecedores", href: "/suppliers" },
        ],
      },
    };
  },
};

export const layoutSuppliers: RouteObject = {
  path: "suppliers",
  element: <LayoutSuppliers />,
  children: [suppliers, newSupplier, updateSupplier],
};

export default { suppliers, newSupplier, updateSupplier, layoutSuppliers };
