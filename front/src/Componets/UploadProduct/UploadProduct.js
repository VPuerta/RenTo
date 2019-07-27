import React, { Component } from 'react';
import axios from 'axios';
import AuthServices from '../../Services/Services'

export default class UploadProduct extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
        //   photos: [],
          owner: this.props._id,
          name:"",
          category:"",
          price: "",
          description:""
        };
        this.service = new AuthServices();
     }

      handleFormSubmit = (event) => {
        event.preventDefault();
        const owner = this.props.id;
        const name = this.state.name;
        const category = this.state.category;
        const price = this.state.price;
        const description = this.state.description
        // const photos = this.state.photos;

        this.service.addProduct(owner,name,category,price,description)
        .then( response => {
            this.setState({
                owner: this.props.id,
                name:"",
                category:"",
                price: "",
                description:""
            });
            
                this.props.getUser(response)
            }).catch(error => console.log(error))
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        console.log(this.state)
        this.setState({[name]: value});
    };



    render() {
        return (
            
                <form className="add-new-product" onSubmit={this.handleFormSubmit}>
                        {/* <div>
                        <input type="file" value={this.state.photo} onChange={ e => this.handleChange(e)} /> <br/>
                        <button className="btn btn-warning" type="submit">Upload photo</button>
                        </div> */}
                
                    <div>
                    <input type="text" placeholder="Product Name" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
                    </div>
                    <div >
                    <select name="category" form="category" value={this.state.category} onChange={ e => this.handleChange(e)}>
                        <option value="error">-----</option>
                        <option value="Sport">Sport</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" placeholder="Price € " name="price" value={this.state.price} onChange={ e => this.handleChange(e)}/>
                    </div>
                    <div >
                    <textarea type="text" placeholder="How is it?" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}/>
                    </div>
                    <div className="btn-edit">
                        <button className="btn btn-warning" onClick = {(e)=>this.handleFormSubmit(e)}>Add</button>
                        {/* <button className="btn btn-warning">Edit</button>
                        <button className="btn btn-warning">Delete</button> */}
                    </div>
                    </form>
            
        )
    }
}
