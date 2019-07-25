import React, { Component } from 'react';
import axios from 'axios';

export default class MyProducts extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            myProducts: {
                pictures: [],
                owner: {}
            }
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
            <div className="card mb-3" style={{ maxwidth: "540px" }}>
                {
                    this.state.myProducts.map(myProduct => {
                        return (
                            <div className="row no-gutters">
                                <div key={myProduct._id}>
                                    <div className="col-md-4">
                                        <img src={myProduct.pictures[0].imgName} className="card-img" alt={myProduct.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{myProduct.name}</h5>
                                            <p className="card-text">{myProduct.description}</p>
                                            <p className="card-text"><small className="text-muted">{myProduct.price}</small></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

} 