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

    // ownerProduct = () => {
    //     const { params } = this.props.match;
    //     axios.get(`http://localhost:5000/user/${params.id}/products`)
    //         .then(response => {
    //             console.log(response.data)
    //             const productsOwner = response.data;
    //             this.setState({
    //                 productsOwner: productsOwner
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }
    
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

           <div className="container2">
            <div >  
                <Link to={"/products"}>
                    <p>Back</p>
                </Link>
                <div>
                    <div className="items2">
                        {
                            this.state.productsOwner.map(productOwner => {
                                return (
                                    <div key={productOwner._id}>
                                        <div className="card2" >
                                            <img src={this.getImageName(productOwner)} style={{height:250}} className="card-img-top" alt={productOwner.name} />
                                            <div className="card-body">
                                                <Link to={"/product/" + productOwner._id}>
                                                    <h6>{productOwner.name}</h6>
                                                </Link>
                                                <h6>{productOwner.price} €</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
            </div>
        )
    }

}
