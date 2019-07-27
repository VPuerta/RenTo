import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
                <p>All Products {this.productsOwner.length}</p>
                <div>
                    <div className="card">
                        {
                            this.state.productsOwner.map(productOwner => {
                                return (
                                    <div key={productOwner._id}>
                                        <div className="card" style={{width: "18rem"}}>
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
