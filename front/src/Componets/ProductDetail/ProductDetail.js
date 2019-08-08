import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleMap from '../Map/SimpleMap';
import './ProductDetail.css'
import AuthServices from '../../Services/Services';
import UploadRent from '../UploadRent/UploadRent';


export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        console.log(props);
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
                    <div className="image-detail" >
                        <img src={this.state.product.imageUrl} alt="" />
                    </div>

                    <div className="detail" >
                        <h5 className="card-title">{this.state.product.name}</h5>
                        <h6 className="card-text">Price per day</h6>
                        <p className="card-text">{this.state.product.price} €</p>
                        <h6 className="card-text">Description</h6>
                        <p className="card-text">{this.state.product.description}</p>
                    </div>

                    <div className="detail" >
                        <Link to={"/user/" + this.state.product.owner._id + "/products"}>
                            <p>See other products of {this.state.product.owner.username}</p>
                        </Link>
                    </div>

                    <div  className="map-detail">
                        <SimpleMap API_KEY="AIzaSyAzGHDso1aXodTgAxYYmuTHdp9iVdxanhM" prod={this.state.product}/>
                    </div>
                </div>

            </div>
        )
    }
}
