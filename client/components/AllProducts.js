import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/allProducts";
import { Link } from "react-router-dom";
import AddProductForm from "./AddProductForm";

// Notice that we're exporting the AllCampuses component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    if (this.props.products) {
      console.log(this.props.products);
    }
    const products = this.props.products;
    return (
      <div className="allProducts">
        {products.map((product) => (
          <div className="prodBox" key={product.id}>
            <Link to={`/products/${product.id}`} key={product.id}>
              <div
                style={{
                  backgroundColor: "lightgray",
                  height: "80%",
                  width: "80%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "1em",
                  padding: "30px 30px",
                }}
              >
                <img src={product.imageSmall} style={{ height: "10%" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "80%",
                  width: "100%",
                  marginBottom: "-6%",
                  marginTop: "5%",
                }}
              >
                <small
                  style={{
                    color: "gray",
                    marginTop: "5%",
                    fontSize: "23px",
                  }}
                >
                  National Pokedex Number: {product.nationalPokedexNumbers}
                </small>
                <h1 style={{ fontSize: "32px" }}>{product.name} </h1>{" "}
                <h2
                  style={{
                    alignSelf: "end",
                    marginBottom: "4%",
                    marginRight: "4%",
                  }}
                >
                  ${product.price}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
