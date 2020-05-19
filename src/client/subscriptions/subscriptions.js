import gql from "graphql-tag";

const ON_CREATE_USER = `subscription OnCreateTodo {
  onCreateTodo {
    id
    name
    description
  }
}
`;
const ON_UPDATE_USER = `subscription OnUpdateTodo {
  onUpdateTodo {
    id
    name
    description
  }
}
`;
const ON_DELETE_USER = `subscription OnDeleteTodo {
  onDeleteTodo {
    id
    name
    description
  }
}
`;

// export all the important pieces
export { ON_CREATE_USER, ON_UPDATE_USER, ON_DELETE_USER };
