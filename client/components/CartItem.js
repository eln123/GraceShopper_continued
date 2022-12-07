import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../store/singleProduct";
import { updateOrderProduct, removeItem } from "../store/order";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      quantity: 1,
      unitPrice: this.props.product.price,
      totalPrice: this.unitPrice * this.quantity,
    };
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleQuantity(evt) {
    let quantity = Number([evt.target.value]);
    const totalPrice = quantity * this.props.product.price;
    let updateInfo = {
      quantity,
      unitPrice: this.state.unitPrice,
      totalPrice: totalPrice,
    };
    this.props.updateOrder(this.props.product, updateInfo);
    this.setState({ quantity, totalPrice });
  }

  handleClick() {
    let quantity = Number(this.inputRef.current.value);
    const totalPrice = quantity * this.props.product.price;
    let updateInfo = {
      quantity,
      unitPrice: this.state.unitPrice,
      totalPrice: totalPrice,
    };
    this.props.updateOrder(this.props.product, updateInfo);
    this.setState({ quantity, totalPrice });
  }

  handleDelete() {
    this.props.removeProduct(this.props.product);
  }

  componentDidMount() {
    const quantity = this.props.product.Order_Product.quantity;
    const totalPrice = quantity * this.props.product.price;
    this.setState({ quantity, totalPrice });
  }

  render() {
    const { product } = this.props;
    const { quantity, unitPrice, totalPrice } = this.state;
    const { handleClick, handleQuantity, handleDelete } = this;
    const selectMenu =
      quantity < 10 ? (
        <select
          id="cartQtySelect"
          value={quantity}
          onChange={(evt) => {
            handleQuantity(evt);
          }}
        >
          <option id="cartQtyOption" value="1">
            1
          </option>
          <option id="cartQtyOption" value="2">
            2
          </option>
          <option id="cartQtyOption" value="3">
            3
          </option>
          <option id="cartQtyOption" value="4">
            4
          </option>
          <option id="cartQtyOption" value="5">
            5
          </option>
          <option id="cartQtyOption" value="6">
            6
          </option>
          <option id="cartQtyOption" value="7">
            7
          </option>
          <option id="cartQtyOption" value="8">
            8
          </option>
          <option id="cartQtyOption" value="9">
            9
          </option>
          <option id="cartQtyOption" value="10">
            10+
          </option>
        </select>
      ) : (
        <div>
          <input
            id="renderCheckUpdateInput"
            ref={this.inputRef}
            type="text"
            defaultValue={quantity}
          />
          <button
            id="renderCheckUpdateButton"
            onClick={() => {
              handleClick();
            }}
          >
            Update
          </button>
        </div>
      );

    return (
      <div id="cartItemEntireContainer">
        <Link to={`/products/${product.id}`}>
          <img id="cartItemLinkImg" src={product.imageSmall} />
        </Link>
        <div id="cartItemDivOne">
          <div id="cartItemQtyDiv">
            <label id="qtyLabel"> Qty | </label>
            {selectMenu}
          </div>
          <div id="cartItemDeleteButtonDiv">
            <button id="cartItemDeleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
        <div id="cartItemDivTwo">
          <div id="cartItemUnitPriceDiv">${unitPrice / 100}</div>
          <h3>Subtotal: ${totalPrice / 100}</h3>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
    updateOrder: (product, updateInfo) =>
      dispatch(updateOrderProduct(product, updateInfo)),
    removeProduct: (product) => dispatch(removeItem(product)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
