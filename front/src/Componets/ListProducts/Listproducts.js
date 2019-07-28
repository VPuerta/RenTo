import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Listproducts.css'
import FilterProducts from '../Filter/FilterProducts';
import AuthServices from '../../Services/Services'

export default class Listproducts extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
        this.service = new AuthServices();
    }

    getAllProducts = () => {
        this.service.getProducts()
            .then(getAllProducts => {
                console.log(getAllProducts);
                this.setState({
                 products:getAllProducts.data
                });
            }).catch(error => {
                console.log(error);
    });
}

    componentDidMount() {
        this.getAllProducts();
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
            <div className ="container">
                <FilterProducts {...this.state.product}/>
                <div>
                    <div className="items" >
                        {
                            this.state.products.map(product => {
                                return (
                                    <Link to={"/product/" + product._id}>
                                    <div key={product._id}>
                                        <div className="card" style={{width: "18rem",marginBottom:"2rem"}}>
                                            <img src={this.getImageName(product)} className="card-img-top" alt={product.name} style={{height: "18rem"}} />
                                            <div className="card-body">
                                                
                                                <h3>{product.name}</h3>
                                                <h3>{product.price} €</h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

}

