import React, { Component } from 'react';
import AuthServices from '../../Services/Services';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css';
import './MyRents.css';

export default class MyRents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myRents: [],
            myRentsPending: []
        };

        this.service = new AuthServices();
    }

    componentDidMount() {
        let id = this.props._id;
        Promise
            .all([this.service.getMyRents(id), this.service.getMyRentsPending(id)])
            .then((rents) => {
                this.setState({
                    ...this.state,
                    myRents: rents[0],
                    myRentsPending: rents[1],
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange = (rating, idx) => {
        this.service.updateRating(this.state.myRents[idx]._id, rating.rating)
            .then(() => {
                this.state.myRents[idx].rating = rating.rating;
                this.setState({
                    ...this.state,
                    myRents: this.state.myRents

                })
            })
            .catch(console.log)
    };

    handleStatus =(event, idx)=>{
        let status = event.target.value;

        this.service.updateStatus(this.state.myRentsPending[idx]._id, status)
        .then(() =>{
            this.state.myRentsPending[idx].status = status;
            this.setState({
                ...this.state,
                myRentsPending: this.state.myRentsPending
            })
        }).catch(console.log)
    };

    formatDate = (date) => {
        let stringDate = date.toString();
        let times = stringDate.split("T");
        if (times.length > 1) {
            return times[0]
        } else {
            return "Unknown"
        }
    };

    canInteract = (rent) => {
        return rent.status === "confirmed" && rent.rating === 0
    };

    render() {
        return (
            <div className="container3">
                <div className="tittle">
                    <h3>My Rents</h3>
                </div>
                {
                    this.state.myRents.map((rent, idx) => {
                        return (
                            <div className="drop3 cont" key={idx} >
                                <div >
                                    <img className="image" src={rent.product.imageUrl} alt={rent.product.name} />
                                </div>
                                <div className="flex-fill">
                                    <div className="colum">
                                        <div className="contenido">
                                            <div className="product">
                                                <h5 className="card-title">{rent.product.name}</h5>
                                            </div>
                                            <div className="product">
                                                <p className="card-text">{rent.product.price} €</p>
                                            </div>
                                            <div className="product">
                                                <p className="card-text">{rent.category}</p>
                                            </div>
                                            <div className="product">
                                                <p className="card-text">{this.formatDate(rent.firstDay)}</p>
                                            </div>
                                            <div className="product">
                                                <p className="card-text">{this.formatDate(rent.lastDay)}</p>
                                            </div>
                                            <div className="product">
                                                <p className="card-text">Status: {rent.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        Rate:
                                        <Rater total={5} rating={rent.rating} interactive={this.canInteract(rent)} onRate={(rating) => { this.handleChange(rating, idx) }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <div className="tittle">
                    <h3>My Requests</h3>
                </div>
                {
                    this.state.myRentsPending.map((rent, idx) => {
                        return (
                            <div className="drop3 cont" key={idx} >
                                <div >
                                    <img className="image" src={rent.product.imageUrl} alt={rent.product.name} />
                                </div>
                                    <div className="colum">
                                        <div className="contenido">
                                            <div className="product">
                                                <h5 className="card-title">{rent.product.name}</h5>
                                            </div>
                                            <div className="product">
                                                <p className="card-text">{rent.product.price} €</p>
                                            </div>
                                            <div className="product">
                                                <p className="card-text">{rent.category}</p>
                                            </div>
                                            <div className="product">
                                                <p className="card-text">{this.formatDate(rent.firstDay)}</p>
                                            </div>
                                            <div className="product">
                                                <p className="card-text">{this.formatDate(rent.lastDay)}</p>
                                            </div>
                                            <div className="product">
                                                <p className="card-text">Status: {rent.status}</p>
                                            </div>
                                        </div>
                                    </div>

                                <div className="btn-edit">
                                    <button id="button" className="btn btn-warning" disabled={rent.status !== "pending"} value={"confirmed"} onClick={ event => this.handleStatus(event, idx) }>Confirm</button>
                                    <button id="button" className="btn btn-warning" disabled={rent.status !== "pending"} value={"rejected"} onClick={ event => this.handleStatus(event, idx) }>Reject</button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}
