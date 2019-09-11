import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleMap from '../Map/SimpleMap';
import './ProductDetail.css'
import AuthServices from '../../Services/Services';
import UploadRent from '../UploadRent/UploadRent';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css';


export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                imageUrl: "",
                owner: {},
                position: [],

            },
            uploadRent:false,
        };
        this.service = new AuthServices();
    }

    componentDidMount() {
        this.getSingleProduct();
    }

    getSingleProduct = () => {
        this.service.getProductDetail(this.props.productId)
            .then(response => {
                // console.log(response.data)
                const product = response;

                this.setState({
                    product: product
                });
            })
            .catch((err) => {
                console.log(err)
            })
    };

    isMyProduct = () => {
        return this.props.loggedInUser._id === this.state.product.owner._id
    };

    render() {
        return (
            <div className="carousel-slide" data-ride="carousel">
                {
                    !this.isMyProduct() &&
                    <UploadRent history={this.props.history} product = {this.state.product} loggedInUser={this.props.loggedInUser}/>
                }

                <div className="box-detail">
                    <div className="up-box">
                    <div className="detail" >
                        <Link to={"/user/" + this.state.product.owner._id + "/products"}>
                            <p>See other products of {this.state.product.owner.username}</p>
                        </Link>
                    </div>
                    <div>
                        <Rater total={this.state.product.rating} rating={this.state.product.rating} interactive={false}/>
                    </div>
                    </div>
                    <div className="image-detail" >
                        <img src={this.state.product.imageUrl} alt="" />
                    </div>

                    <div className="detail" >
                        <h5 className="card-title">{this.state.product.name}</h5>
                        <h6 className="card-text">Price</h6>
                        <p className="card-text">{this.state.product.price} €</p>
                        <h6 className="card-text">Description</h6>
                        <p className="card-text">{this.state.product.description}</p>
                    </div>


                    <div  className="map-detail">
                        <SimpleMap prod={this.state.product}/>
                    </div>
                </div>

            </div>
        )
    }
}
