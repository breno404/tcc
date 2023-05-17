import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Details } from "@/pages/index";
export const details: RouteObject = {
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

export default { details };
