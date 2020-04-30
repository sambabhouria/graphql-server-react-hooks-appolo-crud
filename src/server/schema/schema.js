const { gql } = require("apollo-server-express");
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # ID field is declared as non-nullable.

  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
  }
`;
module.exports = typeDefs;
