import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProductsOwner.css'
import AuthServices from '../../Services/Services';


export default class ProductsOwner extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            productsOwner: [],

        }
        this.service = new AuthServices();
    }
    componentDidMount() {
        this.ownerProduct();
    }

    ownerProduct = () => {
        const { params } = this.props.match;
        this.service.getMyProducts(params.id)
            .then(response => {
                const productsOwner = response;
                this.setState({
                    productsOwner: productsOwner
                });
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (

            <div className="container2">
                
                    {/* <Link to={"/products"}>
                        <p>Back</p>
                    </Link> */}
                    <div>
                        <div className="items2">
                            {
                                this.state.productsOwner.map(productOwner => {
                                    return (
                                        <Link to={"/product/" + productOwner._id}>
                                            <div key={productOwner._id}>
                                                <div className="card2" >
                                                    <img src={productOwner.imageUrl} style={{ height: 250}} className="card-img-top" alt={productOwner.name} />
                                                    <div className="card-body">
                                                        <h6>{productOwner.name}</h6>
                                                        <h6>{productOwner.price} €</h6>
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
