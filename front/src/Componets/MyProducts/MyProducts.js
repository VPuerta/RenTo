import React, { Component } from 'react';
import axios from 'axios';
import './MyProducts.css'
import UploadProduct from '../UploadProduct/UploadProduct';

export default class MyProducts extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            myProducts: []
        }
    }
    componentDidMount() {
        // const params = this.props._id;
        const params = "5d39ef4afe5e334603b4128e";
        axios.get(`http://localhost:5000/user/${params}/products`)
            .then(response => {
                const myProducts = response.data;
                this.setState({
                    myProducts: myProducts
                });
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {

        return (

            <div className="card mb-3">
                <div className="tittle">
                    <h3>Your Products</h3>
                </div>
                {
                    this.state.myProducts.map(myProduct => {
                        return (
                            <div className="myproducts">
                                <div key={myProduct._id} />
                                <div className="col-md-4">
                                    <img className="image" src={myProduct.pictures[0].imgName} alt={myProduct.name} />
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
                                    <button className="btn btn-warning">Delete</button>
                                </div>


                            </div>
                        )
                    })
                }

                <div >
                    <UploadProduct></UploadProduct>
                </div>
            </div>
        )
    }

} 
