import React, { Component } from 'react';
import axios from 'axios';
import './MyProducts.css'
import UploadProduct from '../UploadProduct/UploadProduct';
import AuthServices from '../../Services/Services';
import placeholder2 from '../Assets/placeholder2.png'

export default class MyProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myProducts: []
        }
        this.service = new AuthServices();
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

    uploadProductDidAddProduct = (product) => {
        console.log("Product added", product);
        const myProducts = this.state.myProducts;
        myProducts.push(product);
        this.setState({
            myProducts: myProducts
        });
    };

    getImageName = (product) => {
        // let imgName;
        // if (product.pictures.length !== 0) {
        //     imgName = product.pictures[0].imageUrl
        // } else {
        //     imgName = placeholder2
        // }
        return product.imageUrl;
    };

    deleteProduct = (product, idx) => {
        this.service.deleteProduct(product._id)
            .then(response => {
                let productSpreadOperator = [...this.state.myProducts];
                productSpreadOperator.splice(idx, 1)
                this.setState({
                    myProducts: productSpreadOperator
                });
            }).catch((err) => { console.log(err) })
    };


    render() {
        return (
            <div className="card mb-3">
                <div className="tittle">
                    <h3>Your Products {this.props.username}</h3>
                </div>
                {
                    this.state.myProducts.map((myProduct, idx) => {
                        return (
                            <div className="myproducts" key={idx} >
                                <div className="">
                                    <img className="image" src={this.getImageName(myProduct)} alt={myProduct.name} />
                                </div>
                                <div className="card-body card-tittle">
                                    <h5 className="card-title">{myProduct.name}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{myProduct.category}</p>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{myProduct.price} €</p>
                                </div>
                                <div className="card-body">
                                    <h6>Description: </h6> <p className="card-text">{myProduct.description} </p>
                                </div>
                                <div className="btn-edit">
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-warning" onClick={() => this.deleteProduct(myProduct, idx)}>Delete</button>
                                </div>


                            </div>
                        )
                    })
                }

                <div >
                    <UploadProduct {...this.props} uploadProductDidAddProduct={p => this.uploadProductDidAddProduct(p)} />
                </div>
            </div>
        )
    }

} 
