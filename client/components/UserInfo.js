import React, { useState } from "react";
import { connect } from "react-redux";
import { updateUser, setUser } from "../store/userInfo";
import { me } from "../store/auth";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      shippingAddress: "",
      billingAddress: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateUser({ ...this.props.auth, ...this.state });
  }

  componentDidMount() {
    this.props.me();
    this.setState({
      firstName: this.props.auth.firstName || "",
      lastName: this.props.auth.lastName || "",
      email: this.props.auth.email || "",
      phoneNumber: this.props.auth.phoneNumber || "",
      shippingAddress: this.props.auth.shippingAddress || "",
      billingAddress: this.props.auth.billingAddress || "",
    });
  }

  render() {
    //returns a form with the user's info that can be edited
    //let address = `${this.state.address1} ${this.state.address2} ${this.state.city} ${this.state.state} ${this.state.zip}`;
    const { handleSubmit, handleChange } = this;
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "whiteSmoke",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20vh",
            left: "50%",
            transform: "translateX(-50%)",
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            border: "2px solid lightgray",
          }}
        >
          <h1 style={{ fontSize: "40px" }}>Update User Details</h1>
          <form
            style={{
              padding: "40px",
              height: "60%",
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
            onSubmit={handleSubmit}
          >
            <div>
              <label
                style={{
                  fontSize: "30px",
                }}
                htmlFor="firstName"
              >
                First name:{" "}
              </label>
              <input
                style={{ fontSize: "30px" }}
                name="firstName"
                onChange={handleChange}
                value={this.state.firstName}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "30px", marginBottom: "5px" }}
                htmlFor="lastName"
              >
                Last name:{" "}
              </label>
              <input
                style={{ fontSize: "30px" }}
                name="lastName"
                onChange={handleChange}
                value={this.state.lastName}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "30px", marginBottom: "5px" }}
                htmlFor="shippingAddress"
              >
                Shipping Address:{" "}
              </label>
              <input
                style={{ fontSize: "30px" }}
                name="shippingAddress"
                onChange={handleChange}
                value={this.state.shippingAddress}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "30px", marginBottom: "5px" }}
                htmlFor="billingAddress"
              >
                Billing Address:{" "}
              </label>
              <input
                style={{ fontSize: "30px" }}
                name="billingAddress"
                onChange={handleChange}
                value={this.state.billingAddress}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "30px", marginBottom: "5px" }}
                htmlFor="phoneNumber"
              >
                Phone Number:{" "}
              </label>
              <input
                style={{ fontSize: "30px" }}
                name="phoneNumber"
                onChange={handleChange}
                value={this.state.phoneNumber}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "30px", marginBottom: "5px" }}
                htmlFor="email"
              >
                Email:{" "}
              </label>
              <input
                style={{ fontSize: "30px" }}
                name="email"
                onChange={handleChange}
                value={this.state.email}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "30px", marginBottom: "5px" }}
                htmlFor="password"
              >
                Password:{" "}
              </label>
              <input
                style={{ fontSize: "30px" }}
                type="password"
                name="password"
                onChange={handleChange}
                value={this.state.password}
              />
            </div>
            <button
              style={{
                height: "60px",
                width: "200px",
                backgroundColor: "rgb(255, 217, 0)",
                fontSize: "30px",
              }}
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUser: (obj) => dispatch(updateUser(obj)),
    clearUser: () => dispatch(setUser()),
    me: () => dispatch(me()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
