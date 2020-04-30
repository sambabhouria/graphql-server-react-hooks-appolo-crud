const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./data-access-layer/db");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");
const port = process.env.PORT || 9000;
// Construct a schema, using GraphQL schema language

/**
 * const typeDefs = gql`
  type Query {
    hello: String
  }
`;

 */

// Provide resolver functions for your schema fields
/**
 * const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};
 */

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: port }, () =>
  console.log(
    `🚀💪🐞🥂 🐼💳💎 🛳  🦁 🍰 🏅 🔜 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
