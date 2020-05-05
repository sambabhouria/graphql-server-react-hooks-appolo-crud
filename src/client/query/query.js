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
  mutation($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: { title: $todo, is_public: $isPublic }) {
      affected_rows
      returning {
        id
        title
        created_at
        is_completed
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
