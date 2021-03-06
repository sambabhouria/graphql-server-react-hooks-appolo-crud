import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// 1
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

//2
// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "http://localhost:9000/graphql",
    // headers: {
    //   authorization: localStorage.getItem("token"),
    //   "client-name": "Space Explorer [web]",
    //   "client-version": "1.0.0",
    // },
    cache: new InMemoryCache(),
  }),
});

// cache.writeData({
//   data: {
//     isLoggedIn: !!localStorage.getItem("token"),
//     cartItems: [],
//   },
// });

/**
 * Render our app
 * - We wrap the whole app with ApolloProvider, so any component in the app can
 *    make GraphqL requests. Our provider needs the client we created above,
 *    so we pass it as a prop
 * - We need a router, so we can navigate the app. We're using Reach router for this.
 *    The router chooses between which component to render, depending on the url path.
 *    ex: localhost:3000/login will render only the `Login` component
 */

// const IS_LOGGED_IN = gql`
//   query IsUserLoggedIn {
//     isLoggedIn @client
//   }
// `;

// function IsLoggedIn() {
//   const { data } = useQuery(IS_LOGGED_IN);
//   return data.isLoggedIn ? <div>connected</div> : <App />;
// }

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
