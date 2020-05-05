import React from "react";

const UserTable = ({ editRow, deleteUser, users: { users } }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>email</th>
        <th style={{ textAlign: "right", paddingRight: "65px" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <button
                onClick={() => {
                  editRow(user);
                }}
                style={{ float: "right" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id)}
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
