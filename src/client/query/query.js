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

const ADD_USER = gql`
  mutation($name: String!, $username: String!, $email: String!) {
    addUser(name: $name, username: $username, email: $email) {
      returning {
        name
        username
        email
      }
    }
  }
`;

// export all the important pieces

export { GET_USERS, ADD_USER };

// module.exports = {
//   GET_USERS,
//   ADD_USER,
// };
