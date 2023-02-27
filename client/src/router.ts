import pages from "./pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: pages.get("Layout"),
    children: [
      {
        path: "",
        element: pages.get("Home"),
        loader: async ({ request, params }) => {
          return {
            breadcrumb: {
              routes: [{ name: "Home", href: "/" }],
            },
          };
        },
      },
      {
        path: "details",
        element: pages.get("Details"),
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
      },
    ],
  },
  {
    path: "login",
    element: pages.get("Login"),
  },
  {
    path: "*",
    element: pages.get("404"),
  },
]);

export default router;
