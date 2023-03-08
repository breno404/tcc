import React from "react";
import { CookiesProvider } from "react-cookie";
import Theme from "@/components/Theme";
import GlobalStyle from "./globalStyle";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <React.StrictMode>
      <CookiesProvider>
        <Theme>
          <RouterProvider router={router} />
        </Theme>
        <GlobalStyle />
      </CookiesProvider>
    </React.StrictMode>
  );
}

export default App;
