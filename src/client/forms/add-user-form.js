import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { GET_USERS, ADD_USER } from "../query/query";

const AddUserForm = (props) => {
  const initialFormState = { id: null, name: "", username: "", email: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log("handleInputChange -> name, value", name, value);

    setUser({ ...user, [name]: value });
  };

  const updateCache = (cache, { data }) => {
    console.log("updateCache -> data", data);
    console.log("updateCache -> cache", cache);

    // Fetch the todos from the cache
    // const existingTodos = cache.readQuery({
    //   query: GET_USERS,
    // });

    // Add the new todo to the cache
    // const newTodo = data.insert_todos.returning[0];
    // cache.writeQuery({
    //   query: GET_USERS,
    //   data: { todos: [newTodo, ...existingTodos.todos] },
    // });
  };

  const resetInput = () => {
    console.log("on complete");
    setUser(initialFormState);
  };

  const [addUser] = useMutation(ADD_USER, {
    update: updateCache,
    onCompleted: resetInput,
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.name || !user.username || !user.email) return;
        const { name, username, email } = user;
        console.log("user", user);

        addUser({ variables: { name, username, email } });

        console.log("=========user==========", user);

        // props.addUser(user);
        // setUser(initialFormState);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
        style={{ border: "1px solid #ccc", backgroundColor: "white" }}
      />
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleInputChange}
        style={{ border: "1px solid #ccc", backgroundColor: "white" }}
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        style={{ border: "1px solid #ccc", backgroundColor: "white" }}
      />
      <div style={{ marginBottom: "20px" }}>
        <button>Add new user</button>
      </div>
    </form>
  );
};

export default AddUserForm;
