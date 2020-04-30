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

  type Query {
    users: [User]
    userById(id: ID!): User
    hello: String
  }

  type Mutation {
    addUser(id: ID, name: String, username: String, email: String): User
  }
`;
module.exports = typeDefs;
