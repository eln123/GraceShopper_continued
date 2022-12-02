import React from "react";
import { connect } from "react-redux";
import usersReducer, { fetchUsers } from "../store/allUsers";
import { Link } from "react-router-dom";

// Notice that we're exporting the AllCampuses component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllUsers extends React.Component {
  componentDidMount() {
    if (this.props.user.userType === "admin") {
      this.props.fetchUsers();
    }
  }
  render() {
    if (this.props.user.userType === "admin") {
      return (
        <table
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            border: "2px solid black",
            fontSize: "30px",
          }}
        >
          <caption style={{ fontSize: "38px", marginBottom: "25px" }}>
            All Registered Users
          </caption>
          <thead>
            <tr>
              <th scope="col" style={{ padding: "20px" }}>
                id
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                first name
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                last name
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                email
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                phone number
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                shipping address
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                billing address
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                Created at
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "20px" }}>{user.id}</td>
                <td style={{ padding: "20px" }}>{user.firstName}</td>
                <td style={{ padding: "20px" }}>{user.lastName}</td>
                <td style={{ padding: "20px" }}>{user.email}</td>
                <td style={{ padding: "20px" }}>
                  {user.phoneNumber ? user.phoneNumber : "null"}
                </td>
                <td style={{ padding: "20px" }}>
                  {user.shippingAddress ? user.shippingAddress : "null"}
                </td>
                <td style={{ padding: "20px" }}>
                  {user.billingAddress ? user.billingAddress : "null"}
                </td>
                <td style={{ padding: "20px" }}>
                  {user.createdAt ? user.createdAt : "null"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return <div>You should not be here</div>;
    }
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
