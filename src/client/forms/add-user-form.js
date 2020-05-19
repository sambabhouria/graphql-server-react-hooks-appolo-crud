import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../mutations/mutations";
import { GET_USERS } from "../query/query";

const AddUserForm = (props) => {
  const initialFormState = { id: null, name: "", username: "", email: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const updateCache = (cache, { data }) => {
    console.log("updateCache -> data", data);
    console.log("updateCache -> cache", cache);

    // Fetch the users from the cache
    const existingUsers = cache.readQuery({
      query: GET_USERS,
    });

    console.log("updateCache -> existingUsers", existingUsers);

    // Add the new todo to the cache
    const newUser = data;
    console.log("updateCache -> newUser", newUser);

    cache.writeQuery({
      query: GET_USERS,
      data: { users: [newUser, ...existingUsers.users] },
    });
  };

  const resetInput = () => {
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
        addUser({ variables: { name, username, email } });
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
