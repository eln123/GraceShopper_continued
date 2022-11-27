import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props;
  const { isLoggedIn } = props;

  return (
    <div
      style={{
        position: "absolute",
        top: "10vh",
        left: "0%",
        height: "90vh",
        width: "100vw",
        backgroundColor: "whiteSmoke",
      }}
    >
      <img src="logo.jpg" />
    </div>
  );
};

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    email: state.auth.email,
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
