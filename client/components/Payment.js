import React from "react";
import { connect } from "react-redux";
import { closeOrder, fetchCart } from "../store/order";
import { me } from "../store";
import { Link } from "react-router-dom";

export class Payment extends React.Component {
  constructor() {
    super();
    this.submitPayment = this.submitPayment.bind(this);
  }

  submitPayment() {
    this.props.close(this.props.cart);
  }

  render() {
    const { submitPayment } = this;

    const products = this.props.cart.products || [];
    let cartItems = products.reduce(function (accum, obj) {
      const {
        Order_Product: { quantity },
      } = obj;
      return accum + quantity;
    }, 0);
    let total = products.reduce(function (accum, obj) {
      const {
        Order_Product: { totalPrice },
      } = obj;
      return accum + totalPrice;
    }, 0);

    return (
      <div>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            border: "2px solid lightgray",
            padding: "50px",
            marginBottom: "50px",
          }}
        >
          {products.map((product, index) => {
            return (
              <div style={{ display: "flex" }} key={index}>
                <img src={product.imageSmall} />
                <div style={{ marginLeft: "30px" }}>
                  <h1>{product.name}</h1>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <h1 style={{ color: "maroon" }}>
                      {" "}
                      ${product.price / 100}{" "}
                    </h1>
                    <h1 style={{ color: "black" }}> & </h1>
                    <h1 style={{ color: "rgb(81, 129, 142)" }}>FREE Returns</h1>
                  </div>
                  <div>
                    <h2>Qty: {product.Order_Product.quantity}</h2>
                  </div>
                  <h4></h4>
                </div>
              </div>
            );
          })}
        </ul>
        <div
          style={{
            border: "2px solid lightgray",
            height: "150px",
            display: "flex",
            gap: "30px",
            marginBottom: "10vh",
          }}
        >
          <button
            style={{
              marginLeft: "50px",
              height: "70px",

              width: "300px",
              alignSelf: "center",
              backgroundColor: "rgb(255, 217, 0)",
              borderRadius: "20px",
              border: "0px",
            }}
            onClick={() => {
              submitPayment();
              alert("Thank you for your purchase!");
            }}
          >
            <h1>Place your order</h1>
          </button>
          <div style={{ alignSelf: "center" }}>
            <h1 style={{ color: "maroon", fontSize: "36px" }}>
              Order Total: ${total / 100}
            </h1>
            <h3>
              By placing your order, you agree to the terms and the conditions
            </h3>
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

const mapDispatch = (dispatch, { history }) => {
  return {
    close: (cart) => dispatch(closeOrder(cart, history)),
    load: () => dispatch(fetchCart()),
    setAuth: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Payment);
