import React from "react";
import { CookiesProvider } from "react-cookie";
import Theme from "@/components/Theme";
import GlobalStyle from "./globalStyle";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <React.StrictMode>
      <CookiesProvider>
        <ApolloProvider client={client}>
          <Theme>
            <RouterProvider router={router} />
          </Theme>
          <GlobalStyle />
        </ApolloProvider>
      </CookiesProvider>
    </React.StrictMode>
  );
}

export default App;
