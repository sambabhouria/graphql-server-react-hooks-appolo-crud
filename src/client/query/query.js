import gql from "graphql-tag";

const GET_USERS = gql`
  {
    users {
      id
      name
      username
      email
    }
  }
`;

// export all the important pieces
export { GET_USERS };
