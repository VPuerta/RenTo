import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductsOwner.css'


export default class ProductsOwner extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            productsOwner: [],
            
        }
    }
    componentDidMount() {
        this.ownerProduct();
    }

    ownerProduct = () => {
        const { params } = this.props.match;
        axios.get(`http://localhost:5000/user/${params.id}/products`)
            .then(response => {
                console.log(response.data)
                const productsOwner = response.data;
                this.setState({
                    productsOwner: productsOwner
                });
            })
            .catch((err) => {
                console.log(err)
            })
    }
    getImageName = (product) => {
        // let imgName;
        // if (product.pictures.length !== 0) {
        //     imgName = product.pictures[0].imgName
        // } else {
        //     imgName = ""
        // }
        return product.imageUrl;
    };

    render() {
        return (
            <div className="" style={{ width: "18rem",padding:"2rem"}}>
                <Link to={"/products"}>
                <p>Back</p>
                </Link>
                <div>
                    <div className="box">
                        {
                            this.state.productsOwner.map(productOwner => {
                                return (
                                    <div key={productOwner._id}>
                                        <div className="card" >
                                            <img src={this.getImageName(productOwner)} className="card-img-top" alt={productOwner.name} />
                                            <div className="card-body">
                                                <Link to={"/product/" + productOwner._id}>
                                                    <h3>{productOwner.name}</h3>
                                                </Link>
                                                <h3>{productOwner.price} €</h3>
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
