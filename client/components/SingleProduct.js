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
      <div>
        {isLoggedIn ? (
          this.props.user.userType === "admin" ? (
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "0%",
                height: "90vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgb(246, 242, 242)",
                  height: "50vh",
                  width: "50vh",
                  position: "absolute",
                  top: "15%",
                  left: "17%",
                }}
              >
                <img src={product.imageSmall} style={{ height: "40vh" }}></img>
              </div>

              <div>
                <div
                  style={{
                    position: "absolute",
                    top: "2%",
                    left: "70%",

                    display: "flex",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  <div>
                    <UpdateProduct product={product} />
                  </div>
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
                <div
                  style={{
                    height: "40vh",
                    width: "20vh",
                    position: "absolute",
                    top: "20%",
                    left: "47%",
                  }}
                >
                  <div>
                    <h1 style={{ color: "gray" }}>
                      Home / {product.nationalPokedexNumbers}
                    </h1>
                    <h2 style={{ fontSize: "34px", textDecoration: "bold" }}>
                      {product.name}
                    </h2>
                    <h1 style={{ fontSize: "40px" }}>
                      ${+product.price / 100}
                    </h1>

                    <button
                      style={{
                        backgroundColor: "rgb(255, 217, 0)",

                        border: "0px",
                        height: "60px",
                        width: "200px",
                        fontSize: "28px",
                      }}
                      type="button"
                      onClick={() => this.props.addItem(product)}
                    >
                      Add to Cart
                    </button>
                    <div style={{ marginTop: "15%" }}>
                      <h2 style={{ fontDecoration: "bold", fontSize: "24px" }}>
                        Product Details{" "}
                      </h2>
                      <p style={{ fontSize: "22px" }}> {product.flavorText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <img src={product.imageSmall}></img>
              </div>
              <div>
                <h1 className="center">Poke Name: {product.name}</h1>
                <h1 className="center">
                  Nat. Dex Number: {product.nationalPokedexNumbers}
                </h1>
                <h3 className="center">{product.flavorText}</h3>
                <h2 className="center">${+product.price / 100}</h2>
                <nav>
                  <button
                    className="center"
                    type="button"
                    onClick={() => this.props.addItem(product)}
                  >
                    Add to Cart
                  </button>
                </nav>
              </div>
            </div>
          )
        ) : (
          <div>
            <div>
              <img src={product.imageSmall}></img>
              <div>
                <h1 className="center">Poke Name: {product.name}</h1>
                <h1 className="center">
                  Nat. Dex Number: {product.nationalPokedexNumbers}
                </h1>
                <h3 className="center">{product.flavorText}</h3>
                <h2 className="center">${+product.price / 100}</h2>
                <nav>
                  <button
                    onClick={() => {
                      this.addedToCart();
                    }}
                  >
                    Add to Cart
                  </button>
                </nav>
              </div>{" "}
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
