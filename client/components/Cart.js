import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, deleteFromLocalStorage } from "../store/order";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.state = {
      total: 0,
      currentProduct: {},
      localStorage: {},
    };
    this.parseLocalStorage = this.parseLocalStorage.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.deleteFromLocalStorage = this.deleteFromLocalStorage.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.reRender = this.reRender.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  parseLocalStorage() {
    const localStorage = window.localStorage;
    let returnArr = [];
    for (let key in localStorage) {
      if (+key) {
        let parsed = JSON.parse(localStorage[key]);
        returnArr.push(parsed);
      }
    }
    return returnArr;
  }

  updateTotal(product) {
    this.setState({
      total:
        this.state.total +
        product.Order_Product.quantity * product.Order_Product.unitPrice,
    });
  }

  deleteFromLocalStorage(product) {
    localStorage.removeItem(`${product.id}`);
  }

  updateQuantity(product) {
    let quantity = Number(this.inputRef.current.value);
    if (localStorage.getItem(`${product.id}`)) {
      let gotItem = localStorage.getItem(`${product.id}`);
      const parsedItem = JSON.parse(gotItem);
      const newQuantity = quantity;
      const price = parsedItem.Order_Product.unitPrice;
      const total = newQuantity * price;
      const addingItem = {
        Order_Product: {
          productId: product.id,
          quantity: newQuantity,
          unitPrice: product.price,
          totalPrice: total,
        },
        id: product.id,
        name: product.name,
        price: product.price,
        imageLarge: product.imageLarge,
        imageSmall: product.imageSmall,
        flavorText: product.flavorText,
        nationalPokedexNumber: product.nationalPokedexNumbers,
      };
      let updatedStringItem = JSON.stringify(addingItem);
      localStorage.setItem(`${product.id}`, updatedStringItem);
      this.reRender();
    }
  }

  handleQuantity(evt, product) {
    let quantity = Number([evt.target.value]);
    if (localStorage.getItem(`${product.id}`)) {
      let gotItem = localStorage.getItem(`${product.id}`);
      const parsedItem = JSON.parse(gotItem);
      const newQuantity = quantity;
      const price = parsedItem.Order_Product.unitPrice;
      const total = newQuantity * price;
      const addingItem = {
        Order_Product: {
          productId: product.id,
          quantity: newQuantity,
          unitPrice: product.price,
          totalPrice: total,
        },
        id: product.id,
        name: product.name,
        price: product.price,
        imageLarge: product.imageLarge,
        imageSmall: product.imageSmall,
        flavorText: product.flavorText,
        nationalPokedexNumber: product.nationalPokedexNumbers,
      };
      let updatedStringItem = JSON.stringify(addingItem);
      localStorage.setItem(`${product.id}`, updatedStringItem);
      this.reRender();
    }
  }

  reRender() {
    this.state.total = 0;
    this.forceUpdate();
  }

  render() {
    let products = this.props.cart.products || [];
    let loggedOutCart = this.parseLocalStorage();

    products = products.sort(function (a, b) {
      return (
        new Date(b.Order_Product.createdAt) -
        new Date(a.Order_Product.createdAt)
      );
    });
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

    const buttonCheckForUser =
      products.length > 0 ? (
        <div
          style={{
            position: "absolute",
            top: "0vh",
            left: "70vw",
            height: "30vh",
            width: "20vw",
            backgroundColor: "white",
          }}
        >
          <Link to={"/checkout"}>
            <div id="checkoutDiv">
              <p id="subTotalParagraph">Subtotal: </p>{" "}
              <h1 id="subTotalForEntireThing">${total / 100}</h1>
            </div>
            <button id="proceedToCheckoutButton">Proceed to checkout</button>
          </Link>
        </div>
      ) : (
        <Link to={"/products"}>
          <button id="proceedToCheckoutButton">Explore All Items!</button>
        </Link>
      );

    const buttonCheckForGuest =
      loggedOutCart.length > 0 ? (
        <div
          style={{
            position: "absolute",
            top: "0vh",
            left: "70vw",
            height: "30vh",
            width: "20vw",
            backgroundColor: "white",
          }}
        >
          <Link to={"/signup"}>
            <button id="proceedToCheckoutButton">Proceed to Checkout</button>
          </Link>
        </div>
      ) : (
        <Link to={"/products"}>
          <button id="proceedToCheckoutButton">Explore All Items!</button>
        </Link>
      );

    return (
      <div id="cartEntireContainer">
        <div id="cartDiv">
          <div id="divForCartHeaders">
            <h1 id="shoppingCartHeader">Shopping Cart</h1>
            <h2 id="priceHeader">Price</h2>
          </div>
          {this.props.isLoggedIn ? (
            <div id="cartConditionalContainer">
              <ul id="ulCartItems">
                {products.map((product, index) => {
                  return <CartItem product={product} key={index} />;
                })}
              </ul>
              <div id="divForSubTotal">
                <h1>SubTotal: ${total / 100}</h1>
                {buttonCheckForUser}
              </div>
            </div>
          ) : (
            <div id="cartConditionalContainer">
              <ul id="ulCartItems">
                {loggedOutCart.map((product) => {
                  this.state.total += product.Order_Product.totalPrice;
                  const selectMenu =
                    product.Order_Product.quantity < 10 ? (
                      <div id="cartSelectMenuContainer">
                        <label id="qtyLabel"> Qty: </label>
                        <select
                          id="cartQtySelect"
                          value={product.Order_Product.quantity}
                          onChange={(evt) => {
                            this.handleQuantity(evt, product);
                          }}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10+</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <input
                          id="renderCheckUpdateInput"
                          ref={this.inputRef}
                          type="text"
                          defaultValue={product.Order_Product.quantity}
                        />
                        <button
                          id="renderCheckUpdateButton"
                          onClick={() => {
                            this.updateQuantity(product);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    );
                  return (
                    <div id="cartItemEntireContainer" key={product.id}>
                      <Link to={`/products/${product.id}`}>
                        <img id="cartItemLinkImg" src={product.imageSmall} />
                      </Link>

                      <div id="cartItemDivOne">
                        <div id="cartItemQtyDiv">{selectMenu}</div>

                        <div id="cartItemDeleteButtonDiv">
                          <button
                            id="cartItemDeleteButton"
                            onClick={() => {
                              this.deleteFromLocalStorage(product);
                              this.reRender();
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div id="cartItemDivTwo">
                        <div id="cartItemUnitPriceDiv">
                          Unit Price: ${product.Order_Product.unitPrice / 100}
                        </div>
                        <h3>
                          Subtotal: $
                          {(product.Order_Product.quantity *
                            product.Order_Product.unitPrice) /
                            100}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </ul>

              <div id="divForSubTotal">
                <h1>SubTotal: ${this.state.total / 100}</h1>
                {buttonCheckForGuest}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    addToGuestCart: (guestCart) => dispatch(addToGuestCart(guestCart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
