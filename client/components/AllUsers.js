import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/allUsers";
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
        <table>
          {this.props.users.map((user) => (
            <tr>
              <td>hi</td>
            </tr>
          ))}
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
