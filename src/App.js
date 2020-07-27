import React, { useState, Fragment,useEffect } from "react";
import {
  useQuery,
  useMutation
} from "@apollo/react-hooks";
import { GET_USERS } from "./client/query/query";
import { DELETE_USER } from "./client/mutations/mutations";

import AddUserForm from "./client/forms/add-user-form";
import EditUserForm from "./client/forms/edit-user-form";
import UserTable from "./client/tables/user-table";

const App = () => {

  const { loading, error, data } = useQuery(GET_USERS);
  const initialFormState = { id: null, name: "", username: "" };

  // Setting state
  const [ users, setUsers ] = useState([])
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const resetInput = () => {
    setCurrentUser(initialFormState);
  };

  const updateCache = (cache, { data }) => {
    console.log("updateCache -> data", data);
    console.log("updateCache -> cache", cache);
  };

  const [deleteUserMutation] = useMutation(DELETE_USER, {
    update: updateCache,
    onCompleted: resetInput,
  });

  const deleteUser = (id) => {
    console.log("deleteUser -> id", id);
    deleteUserMutation({ variables: { id } });
    setEditing(false)
	  setUsers(users.filter(user => user.id !== id))
  };

  const updateUser = (id, updatedUser) => {
     setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  };

  useEffect(
    () => {
      if (!loading && !error) {
        const {users} = data
        setUsers(users)
      }
    },
    [ data,loading,error ]
  )
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
              <AddUserForm  addUser={addUser}  />
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
          <UserTable users={{users}} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
