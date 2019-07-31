import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleMap from '../Map/SimpleMap';
import './ProductDetail.css'
import AuthServices from '../../Services/Services';


export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            product: {
                imageUrl: "",
                owner: {},
                position: [],

            }
        }
        this.service = new AuthServices();
    }

    componentDidMount() {
        this.getSingleProduct();
    }

    getSingleProduct = () => {
        const { params } = this.props.match;
        this.service.getProductDetail(params.id)
            .then(response => {
                // console.log(response.data)
                const product = response;
                console.log(product)
                this.setState({
                    product: product
                });
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        return (

            <div className="carousel-slide" data-ride="carousel" style={{ width: "55%", padding: "1.5rem" }}>
                <div className="head-card">
                    <div className="name-onwer">
                        <Link to={"/user/" + this.state.product.owner._id + "/products"}>
                            <p>Rent {this.state.product.owner.username}</p>
                        </Link>
                    </div>
                    <div>
                        <Link to={"/messages/" + this.state.product._id }>
                            <button className="btn btn-warning" style={{ marginBottom: "1.5rem", color: "white" }}>Chat</button>
                        </Link>
                    </div>
                </div>
                <ol className="carousel-indicators">

                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner">
                    <img src={this.state.product.imageUrl} className="d-block w-100" alt="" />
                    <div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{this.state.product.name}</h5>
                        <p className="card-text">{this.state.product.price} €</p>
                        <p className="card-text">{this.state.product.description}</p>
                    </div>  
                </div>
                <div>
                    <SimpleMap API_KEY="AIzaSyAzGHDso1aXodTgAxYYmuTHdp9iVdxanhM" prod={this.state.product}></SimpleMap>
                </div>
            </div>
        )
    }
}
