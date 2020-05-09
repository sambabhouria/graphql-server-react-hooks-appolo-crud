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
  mutation($name: String!, $usernameemail: String!, $: String!) {
    addUser(name: $name, username: $username, email: $email) {
      returning {
        id
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
