import React from "react";
import { connect } from "react-redux";
import { updateProductThunk } from "../store/singleProduct";

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      flavorText: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {}
  submitHandler(event) {
    event.preventDefault();
    this.props.updateProduct({ ...this.props.product, ...this.state });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "5px",
          paddingBottom: "5px",
          borderTop: "2px solid black",
          borderBottom: "2px solid black",
        }}
      >
        <h1 style={{ margin: "0 0 0 0", alignSelf: "center" }}> Edit </h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            alignItems: "center",
            gap: "10px",
          }}
          onSubmit={this.submitHandler}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "20px", alignSelf: "center" }}>
              Name
            </label>
            <input
              value={this.state.name}
              type="text"
              name="name"
              onChange={this.handleChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "20px", alignSelf: "center" }}>
              Price
            </label>
            <input
              value={this.state.price}
              type="text"
              name="price"
              onChange={this.handleChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "20px", alignSelf: "center" }}>
              Flavor Text
            </label>
            <input
              value={this.state.flavorText}
              type="text"
              name="flavorText"
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProductThunk(product)),
  };
};

export default connect(null, mapDispatch)(UpdateProduct);
