import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Logistics, LayoutLogistics, Tracking } from "@/pages/index";

export const logistics: RouteObject = {
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

export const tracking: RouteObject = {
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

export const layoutLogistics: RouteObject = {
  path: "logistics",
  element: <LayoutLogistics />,
  children: [logistics, tracking],
};

export default { layoutLogistics, logistics, tracking };
