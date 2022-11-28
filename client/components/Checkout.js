import React from "react";
import { connect } from "react-redux";
import { me } from "../store";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Payment from "./Payment";

class Checkout extends React.Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    if (this.props) {
      console.log("this.props", this.props);
    }
    let products = this.props.cart.products || [];
    let auth = this.props.auth || {};
    products = products.sort(function (a, b) {
      return (
        new Date(b.Order_Product.createdAt) -
        new Date(a.Order_Product.createdAt)
      );
    });
    let total = products.reduce(function (accum, obj) {
      const {
        Order_Product: { totalPrice },
      } = obj;
      return accum + totalPrice;
    }, 0);
    return (
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "12%",
          height: "100vh",
          width: "50vw",
        }}
      >
        <h1>Checkout</h1>
        <div>
          <div
            style={{
              height: "20vh",
              borderTop: "2px solid lightgray",
              borderBottom: "2px solid lightgray",
            }}
          >
            <h1 style={{ fontSize: "40px" }}>1 Shipping Information</h1>
            <h2>
              Name: {auth.firstName} {auth.lastName}
            </h2>
            <h2>Address: {auth.shippingAddress}</h2>
            <Link to={"/checkout/edit"}>
              <button
                style={{ height: "50px", width: "100px", fontSize: "21px" }}
              >
                Edit
              </button>
            </Link>
          </div>
          <div
            style={{
              height: "20vh",

              borderBottom: "2px solid lightgray",
            }}
          >
            <h1 style={{ fontSize: "40px" }}>2 Payment Information</h1>
          </div>
          <div
            style={{
              height: "8vh",
              borderTop: "2px solid lightgray",
              borderBottom: "2px solid lightgray",
            }}
          >
            <h1 style={{ fontSize: "40px" }}>3 Offers</h1>
          </div>
          <div
            style={{
              borderTop: "2px solid lightgray",
              borderBottom: "2px solid lightgray",
            }}
          >
            <h1 style={{ fontSize: "40px" }}>4 Review Items and Shipping</h1>
            <Payment />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    load: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
