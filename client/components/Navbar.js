import React, { useReducer } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, cart, products, isAdmin }) => {
  let items = cart.products || [];
  let cartItems = items.reduce(function (accum, obj) {
    const {
      Order_Product: { quantity },
    } = obj;
    return accum + quantity;
  }, 0);
  let productsLength = products.length;

  return (
    <div
      id="doesNotMatterIfYouAreLoggedIn"
      style={{
        zIndex: "1",
        top: "0%",
        left: "0%",
        width: "100%",
        height: "10vh",
        backgroundColor: "#69a7e2",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: ".5em",
        paddingBottom: ".5em",
        borderBottom: ".5px solid black",
      }}
    >
      <h1
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="/logo.png"
          style={{
            backgroundColor: "black",
            height: "100px",
            width: "100px",
            marginRight: "20px",
            borderRadius: "50%",
          }}
        />
        Pokemon TCG Shop.
      </h1>
      {isLoggedIn ? (
        isAdmin ? (
          <div className="linkHolder">
            <div className="anchor-container">
              <Link to="/home">Home</Link>
            </div>
            <div className="anchor-container">
              <Link to="/products">Products({productsLength})</Link>
            </div>
            <div className="anchor-container">
              <Link to="/cart">Cart({cartItems})</Link>
            </div>
            <div className="anchor-container">
              <Link to="/editInfo">Edit Your Info</Link>
            </div>

            <div
              style={{
                height: "40px",
                width: "160px",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link style={{ color: "white" }} to="/users">
                View Users
              </Link>
            </div>
            <div className="anchor-container">
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
            <div
              style={{
                position: "absolute",
                zIndex: "1",
                top: "11vh",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100vw",
                height: "10vh",
                color: "white",
                fontSize: "35px",
                backgroundColor: "limegreen",
                borderBottomLeftRadius: "50%",
                borderBottomRightRadius: "50%",
                display: "flex",

                justifyContent: "center",
              }}
            >
              <p style={{ fontSize: "59px" }}>This Is Admin View</p>
            </div>
          </div>
        ) : (
          <div className="linkHolder">
            <div className="anchor-container">
              <Link to="/home">Home</Link>
            </div>
            <div className="anchor-container">
              <Link to="/products">Products({productsLength})</Link>
            </div>
            <div className="anchor-container">
              <Link to="/cart">Cart({cartItems})</Link>
            </div>
            <div className="anchor-container">
              <Link to="/editInfo">Edit Your Info</Link>
            </div>
            <div className="anchor-container">
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          </div>
        )
      ) : (
        <div className="linkHolder">
          <div className="anchor-container">
            <Link to="/home">Home</Link>
          </div>
          <div className="anchor-container">
            <Link to="/products">Products({productsLength})</Link>
          </div>
          <div className="anchor-container">
            <Link to="/cart">Cart</Link>
          </div>
          <div className="anchor-container">
            <Link to="/login">Login / Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.userType === "admin",
    cart: state.cart,
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
