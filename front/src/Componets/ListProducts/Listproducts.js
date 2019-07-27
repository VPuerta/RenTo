import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Listproducts.css'
import FilterProducts from './Filter/FilterProducts';

export default class Listproducts extends Component {
    constructor() {
        super()
        this.state = {
            products: []
        }
    }

    getAllProducts = () => {
        axios.get(`http://localhost:5000/products`)
            .then(allProducts => {
                console.log(allProducts.data)
                this.setState({
                    products: allProducts.data
                })
            }).catch(err => console.log(err))
    }

    componentDidMount() {
        this.getAllProducts();
    }

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
            <div style={{ width: "18rem",padding:"2rem"}}>
                <FilterProducts {...this.state.product}/>
                <div>
                    <div className="card" >
                        {
                            this.state.products.map(product => {
                                return (
                                    <div key={product._id}>
                                        <div className="card" style={{width: "18rem"}}>
                                            <img src={this.getImageName(product)} className="card-img-top" alt={product.name} />
                                            <div className="card-body">
                                                <Link to={"/product/" + product._id}>
                                                    <h3>{product.name}</h3>
                                                </Link>
                                                <h3>{product.price} €</h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

}

