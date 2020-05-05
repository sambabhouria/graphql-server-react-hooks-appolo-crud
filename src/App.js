import React, { useState, Fragment } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
//import gql from "graphql-tag";

import { GET_USERS, ADD_USER } from "./client/query/query";

import AddUserForm from "./client/forms/add-user-form";
import EditUserForm from "./client/forms/edit-user-form";
import UserTable from "./client/tables/user-table";

const App = () => {
  // Data
  const { loading, error, data } = useQuery(GET_USERS);
  // const donneUtilisation = data;
  const usersData = [
    { id: 1, name: "Tania", username: "floppydiskette" },
    { id: 2, name: "Craig", username: "siliconeidolon" },
    { id: 3, name: "Ben", username: "benisphere" },
  ];

  const initialFormState = { id: null, name: "", username: "" };

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setEditing(false);

    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return (
    <div className="container">
      <h1>Create Read Updae Delete Users</h1>
      <div className="flex-row" style={{ marginBottom: "25px" }}>
        <div
          className="flex-large"
          style={{
            backgroundColor: "#f2f2f2",
            borderRadius: "15px",
          }}
        >
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
        </div>
      </div>
      <div className="flex-row">
        <div
          className="flex-large"
          style={{ backgroundColor: "#f2f2f2", borderRadius: "15px" }}
        >
          <h2>View Lists Users</h2>
          <UserTable users={data} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
