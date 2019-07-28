import React, { Component } from 'react';
import AuthServices from '../../Services/Services';
import './UploadProduct.css'

export default class UploadProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: [],
            owner: this.props._id,
            pictures:null,
            name:"",
            category:"",
            price: "",
            description:""
        };
        this.service = new AuthServices();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const owner = this.props._id;
        const name = this.state.name;
        const category = this.state.category;
        const price = this.state.price;
        const description = this.state.description;
        const pictures = this.state.photos;

        this.service.addProduct(owner,pictures,name,category,price,description)
            .then(response => {
                console.log("Add products did success with response", response);
                this.setState({
                    owner: "",
                    // pictures:[],
                    name:"",
                    category:"",
                    price: "",
                    description:""
                });
                // Notify MyProduct.js about an update.
                this.props.uploadProductDidAddProduct(response)
            }).catch(error => {
                console.log("Add products did fail with error", error);
            })
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    };

    render() {
        return (
            <form className="add-new-product" onSubmit={this.handleFormSubmit}>
                            {/* <div >
                            <input type="file" value={this.state.pictures} onChange={ e => this.handleChange(e)} /> <br/>
                            <button className="btn btn-warning" type="submit">Upload photo</button>
                            </div> */}
                <div className="form-contem">
                <div className="form">
                    <input type="text" placeholder="Product Name" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
                </div>
                <div className="form">
                    <select name="category" form="category" value={this.state.category} onChange={ e => this.handleChange(e)}>
                        <option value="">-----</option>
                        <option value="Sport">Sport</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                    <div className="form">
                    <input type="text" placeholder="Price € " name="price" value={this.state.price} onChange={ e => this.handleChange(e)}/>
                    </div>
                
                <div className="form">
                    <textarea type="text" placeholder="How is it?" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}/>
                </div>
                <div className="btn-edit">
                    <button className="btn btn-warning" onClick = {(e)=>this.handleFormSubmit(e)}>Add</button>
                 
                </div>
                </div>
            </form>

        )
    }
}
