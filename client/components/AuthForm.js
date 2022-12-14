import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  return displayName === "Login" ? (
    <div>
      <form id="loginForm" onSubmit={handleSubmit} name={name}>
        <div id="divLoginForm">
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input id="inputLoginForm" name="email" type="text" />
        </div>
        <div id="divLoginForm">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input id="inputLoginForm" name="password" type="password" />
        </div>
        <div id="divLoginForm">
          <button type="submit">{displayName}</button>
        </div>
        <div id="divLoginForm">
          <Link to={"/signup"}>Sign Up</Link>
        </div>
        <div>
          {error && error.response && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "75%",
                transform: "translateX(-50%)",
                fontSize: "30px",
                color: "red",
              }}
            >
              {error.response.data}
            </div>
          )}
        </div>
      </form>
    </div>
  ) : (
    <div>
      <form id="loginForm" onSubmit={handleSubmit} name={name}>
        <div id="divLoginForm">
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div id="divLoginForm">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div id="divLoginForm">
          <button id="signupButton" type="submit">
            {displayName}
          </button>
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "75%",
            transform: "translateX(-50%)",
            fontSize: "30px",
            color: "red",
          }}
        >
          {error && error.response && <div> {error.response.data} </div>}
        </div>
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
