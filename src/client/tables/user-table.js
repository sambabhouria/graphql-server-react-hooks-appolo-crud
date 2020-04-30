import React from "react";

const UserTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th style={{ textAlign: "right", paddingRight: "65px" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(user);
                }}
                style={{ float: "right" }}
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteUser(user.id)}
                style={{ float: "right" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default UserTable;
