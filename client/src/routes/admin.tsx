import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Admin } from "@/pages/index";

export const admin: RouteObject = {
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

export default { admin };
