import React from "react";
import { connect } from "react-redux";
import { fetchProduct, deleteProduct } from "../store/singleProduct";
import { addItem } from "../store/order";
import UpdateProduct from "./UpdateProductForm";

export class SingleProduct extends React.Component {
  constructor() {
    super();
    this.isAdmin = this.isAdmin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addedToCart = this.addedToCart.bind(this);
  }
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
    this.setState(this.props.product);
  }
  addedToCart() {
    const productItem = {
      Order_Product: {
        productId: this.props.product.id,
        quantity: 1,
        unitPrice: this.props.product.price,
        totalPrice: this.props.product.price,
      },
      id: this.props.product.id,
      name: this.props.product.name,
      price: this.props.product.price,
      imageLarge: this.props.product.imageLarge,
      imageSmall: this.props.product.imageSmall,
      flavorText: this.props.product.flavorText,
      nationalPokedexNumbers: this.props.product.nationalPokedexNumbers,
    };

    if (localStorage.getItem(`${this.props.product.id}`)) {
      let gotItem = localStorage.getItem(`${this.props.product.id}`);
      const parsedItem = JSON.parse(gotItem);
      const newQuantity = parsedItem.Order_Product.quantity + 1;
      const price = parsedItem.Order_Product.unitPrice;
      const total = newQuantity * price;

      const addingItem = {
        Order_Product: {
          productId: this.props.product.id,
          quantity: newQuantity,
          unitPrice: this.props.product.price,
          totalPrice: total,
        },
        id: this.props.product.id,
        name: this.props.product.name,
        price: this.props.product.price,
        imageLarge: this.props.product.imageLarge,
        imageSmall: this.props.product.imageSmall,
        flavorText: this.props.product.flavorText,
        nationalPokedexNumbers: this.props.product.nationalPokedexNumbers,
      };
      let updatedStringItem = JSON.stringify(addingItem);
      localStorage.setItem(`${this.props.product.id}`, updatedStringItem);
    } else {
      let stringItem = JSON.stringify(productItem);
      localStorage.setItem(`${this.props.product.id}`, stringItem);
    }
  }

  guestCartLoader() {
    const productItem = localStorage.getItem(`${this.props.product.id}`);
    const parsedItem = JSON.parse(productItem);
    this.props.addToGuestCart(parsedItem);
  }

  isAdmin(userType) {
    return userType === "admin" ? true : false;
  }

  handleClick() {
    this.props.deleteProduct(this.props.product);
    window.location.reload();
  }

  render() {
    const product = this.props.product || {};
    const isLoggedIn = this.props.isLoggedIn;
    if (!product) {
      return <div>Pokemon Deleted! Go back to all products...</div>;
    }
    return (
      <div id="singleProductComponent">
        {isLoggedIn ? (
          this.props.user.userType === "admin" ? (
            <div id="container">
              <div id="productImgDiv">
                <img src={product.imageSmall} style={{ height: "40vh" }}></img>
              </div>

              <div id="adminPartOfThisPage">
                <div
                  style={{
                    position: "absolute",
                    top: "20%",
                    left: "70%",

                    display: "flex",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  <UpdateProduct product={product} />

                  <div
                    style={{
                      position: "relative",
                      width: "300px",
                      borderLeft: "2px solid white",
                    }}
                  >
                    <h1
                      style={{
                        position: "absolute",
                        top: "-4%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      Delete
                    </h1>
                    <button
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        height: "40%",
                        width: "50%",
                        backgroundColor: "black",
                        color: "white",
                        fontSize: "20px",
                        border: "2px solid white",
                      }}
                      type="button"
                      onClick={() => {
                        this.handleClick();
                      }}
                    >
                      REMOVE ITEM
                    </button>
                  </div>
                </div>

                <div id="divForRightSideStuff">
                  <h1 id="h1nationalPokeNum">
                    Home / {product.nationalPokedexNumbers}
                  </h1>
                  <h2 id="h2productNameHeader">{product.name}</h2>
                  <h1 id="productPriceHeader">${+product.price / 100}</h1>

                  <button
                    id="addToCartButton"
                    type="button"
                    onClick={() => this.props.addItem(product)}
                  >
                    Add to Cart
                  </button>
                  <div id="productDetailsDiv">
                    <h2 id="productDetailsHeader">Product Details </h2>
                    <p
                      id="productDetailsParagraph"
                      style={{ fontSize: "22px" }}
                    >
                      {" "}
                      {product.flavorText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div id="container">
              <div id="productImgDiv">
                <img src={product.imageSmall} style={{ height: "40vh" }}></img>
              </div>
              <div id="divForRightSideStuff">
                <h1 id="h1nationalPokeNum">
                  Home / {product.nationalPokedexNumbers}
                </h1>
                <h2 id="h2productNameHeader">{product.name}</h2>
                <h1 id="productPriceHeader">${+product.price / 100}</h1>

                <button
                  id="addToCartButton"
                  type="button"
                  onClick={() => this.props.addItem(product)}
                >
                  Add to Cart
                </button>
                <div id="productDetailsDiv">
                  <h2 id="productDetailsHeader">Product Details </h2>
                  <p id="productDetailsParagraph" style={{ fontSize: "22px" }}>
                    {" "}
                    {product.flavorText}
                  </p>
                </div>
              </div>
            </div>
          )
        ) : (
          <div id="container">
            <div id="productImgDiv">
              <img src={product.imageSmall} style={{ height: "40vh" }}></img>
            </div>
            <div id="divForRightSideStuff">
              <h1 id="h1nationalPokeNum">
                Home / {product.nationalPokedexNumbers}
              </h1>
              <h2 id="h2productNameHeader">{product.name}</h2>
              <h1 id="productPriceHeader">${+product.price / 100}</h1>

              <button
                id="addToCartButton"
                type="button"
                onClick={() => this.addedToCart()}
              >
                Add to Cart
              </button>
              <div id="productDetailsDiv">
                <h2 id="productDetailsHeader">Product Details </h2>
                <p id="productDetailsParagraph" style={{ fontSize: "22px" }}>
                  {" "}
                  {product.flavorText}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    user: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    addItem: (product) => dispatch(addItem(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
