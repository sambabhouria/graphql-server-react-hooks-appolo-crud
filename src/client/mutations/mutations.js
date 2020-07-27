import gql from "graphql-tag";
const ADD_USER = gql`
  mutation($id: ID,$name: String!, $username: String!, $email: String!) {
    addUser(id: $id,name: $name, username: $username, email: $email) {
      id
      name
      username
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation($id: ID, $name: String!, $username: String!, $email: String!) {
    updateUser(id: $id, name: $name, username: $username, email: $email) {
      id
      name
      username
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation($id: String!) {
    deleteUser(id: $id) {
      id
      name
      username
      email
    }
  }
`;
// export all the important pieces
export { ADD_USER, DELETE_USER, UPDATE_USER };
