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
            myRentsPending: [],
            product: {
                values: [],
                average: null,
                status:"pending",
            }
        }
        this.service = new AuthServices();
    }

    componentDidMount() {
        let id = this.props._id;
        Promise
            .all([this.service.getMyRents(id), this.service.getMyRentsPending(id)])
            .then((rents) => {

                console.log(rents[1])
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
                    ...this.state
                })
            })
            .catch(console.log)
    };

    handleStatusYes =(status,idx)=>{
        this.service.updateStatus(this.state.myRentsPending[idx].product._id,status)
        .then( () =>{
            this.setState({
                ...this.state,
                status: "confirmed"
            })
        })
    }

    handleStatusNo =(status,idx)=>{
        
        this.service.updateStatus(this.state.myRentsPending[idx].product._id,status)
        .then( () =>{
            this.setState({
                ...this.state,
                status: "rejected"
            })
        })
    }


    render() {
        return (
            <div className="container3">
                <div className="tittle">
                    <h3>My Rents</h3>
                </div>
                {
                    this.state.myRents.map((myRent, idx) => {
                        return (
                            <div className="drop3 cont" >
                                <div className="contenido" key={idx} >

                                    <div >
                                        <img className="image" src={myRent.product.imageUrl} alt={myRent.product.name} />
                                    </div>
                                    <div  className="colum">
                                    <div className="product" >
                                        <div  className="card-body">
                                            <p>Owner : {myRent.owner.username}</p>
                                            {/* <p>Client : {myRent.client.username}</p> */}
                                        </div>

                                        <div className="card-body">{myRent.firstDay}</div>
                                        <div className="card-body">{myRent.lastDay}</div>
                                        <div className="card-body"> Status: {myRent.status}</div>
                                     </div>
                                        <div>
                                            Rating:
                                            <Rater total={5} rating={myRent.rating} onRate={(rating) => { this.handleChange(rating, idx) }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="tittle">
                    <h3>My Rental Requests</h3>
                </div>
                {
                    this.state.myRentsPending.map((myRentPending, idx) => {
                        return (
                            <div className="drop3 cont" >
                                <div className="contenido" key={idx} >

                                    <div >
                                        <img className="image" src={myRentPending.product.imageUrl} alt={myRentPending.product.name} />
                                    </div>
                                    <div className="contenido">

                                        <div className="card-body">
                                            {/* <p>Owner : {myRentPending.owner.username}</p> */}
                                            <p>Client : {myRentPending.client.username}</p>
                                        </div>

                                        <div className="card-body" >{myRentPending.firstDay}</div>
                                        <div  className="card-body">{myRentPending.lastDay}</div>

                                        <div className="btn-edit">
                                            <button id="button-chat" onClick={(e) => this.handleStatusYes(e)}>Yes</button>
                                            <button id="button-chat" onClick={(e) => this.handleStatusNo(e)}>No</button>
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
