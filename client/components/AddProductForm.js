import React from "react";
import {connect} from 'react-redux';

class AddProduct extends React.Component {
constructor(){
    super();
    this.state = {
        name: '',
        price: null,
        flavorText: '',
        imageSmall: '',
        imageLarge: '',
        nationalPokedexNumbers: null
    }
    this.submitHandler = this.submitHandler.bind(this);
}
submitHandler(){

}

handleChange(event){
    this.setState({[event.target.name]:event.target.value})
}

render(){
    return(
        <div>
            <h1>Add your Pokemon here:</h1>
            <form onSubmit={this.submitHandler}>
                <label>Name:</label>
                <input value={this.state.name} type="text" name="name" onChange={this.handleChange}></input>
                <label>Price:</label>
                <input value={this.state.price} type="text" name="price" onChange={this.handleChange}></input>
                <label>Description:</label>
                <input value={this.state.flavorText} type="text" name="flavorText" onChange={this.handleChange}></input>
                <label>Image Small:</label>
                <input value={this.state.imageSmall} type="text" name="imageSmall" onChange={this.handleChange}></input>
                <label>Image Large:</label>
                <input value={this.state.imageLarge} type="text" name="imageLarge" onChange={this.handleChange}></input>
                <label>National Pokedex Number:</label>
                <input value={this.state.nationalPokedexNumbers} type="text" name="nationalPokdedexNumbers" onChange={this.handleChange}></input>
            </form>
        </div>
    )
}

}

const mapDispatch = (dispatch) => {
return {
    createProduct: (product) => dispatch(createProduct())
}
}