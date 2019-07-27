import React, { Component } from 'react';
import axios from 'axios';
import './MyProducts.css'
import UploadProduct from '../UploadProduct/UploadProduct';

export default class MyProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myProducts: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/user/${this.props._id}/products`)
            .then(response => {
                console.log("Get my products did success with response", response);
                const myProducts = response.data;
                this.setState({
                    myProducts: myProducts
                });
            })
            .catch((err) => {
                console.log("Get my products did fail with error", err);
            })
    };

    deleteProduct = () => {
        let productSpreadOperator = [...this.state.myProducts];
        productSpreadOperator.splice();
        this.setState({
            myProducts: productSpreadOperator
        });
    };

    uploadProductDidAddProduct = (product) => {
        console.log("Product added" ,product);
        const myProducts = this.state.myProducts;
        myProducts.push(product);
        this.setState({
            myProducts: myProducts
        });
    };

    getImageName = (product) => {
        let imgName;
        if (product.pictures.length !== 0) {
            imgName = product.pictures[0].imgName
        } else {
            imgName = ""
        }
        return imgName;
    };

    render() {
        return (
            <div className="card mb-3">
                <div className="tittle">
                    <h3>Your Products {this.props.username}</h3>
                </div>
                {
                    this.state.myProducts.map(myProduct => {
                        return (
                            <div className="myproducts">
                                <div key={myProduct._id} />
                                <div className="col-md-4">
                                    <img className="image" src={this.getImageName(myProduct)} alt={myProduct.name}/>
                                </div>
                                <div className="card-body card-tittle">
                                    <h5 className="card-title">{myProduct.name}</h5>
                                </div>
                                <div>
                                    <p className="card-text">{myProduct.category}</p>
                                    <p className="card-text">{myProduct.price} €</p>
                                </div>
                                <div className="card-body">
                                    <h6>Description: </h6> <p className="card-text">{myProduct.description} </p>
                                </div>
                                <div className="btn-edit">
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-warning" clickDelete={() => this.deleteProduct()}>Delete</button>
                                </div>


                            </div>
                        )
                    })
                }

                <div >
                    <UploadProduct {...this.props} uploadProductDidAddProduct={ p => this.uploadProductDidAddProduct(p) }/>
                </div>
            </div>
        )
    }

} 
