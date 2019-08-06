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
            product :{
                values:[],
                average:null,
            }
        }
        this.service = new AuthServices();
    }

    componentDidMount() {
        let id = this.props._id;
        this.service.getMyRents(id)
            .then(myRents => {
                console.log("MyRents", myRents);
                this.setState({
                    ...this.state,
                    myRents: myRents
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange = (rating, idx) => {
        //tengo que crear un service para que lo guarde en la base de datos

        this.service.updateRating(this.state.myRents[idx]._id, rating.rating)
            .then(() => {
                this.state.myRents[idx].rating = rating.rating;
                this.setState({
                    ...this.state
                })
            })
            .catch(console.log)
    };


    render() {
        return (
            <div className="container3">
                <div className="tittle">
                    <h3>My Rents</h3>
                </div>
                <div className="drop3 cont" >
                    {
                        this.state.myRents.map((myRent, idx) => {
                            return (
                                <div className="contenido"  key={idx} >

                                    <div >
                                        <img className="image" src={myRent.product.imageUrl} alt={myRent.product.name} />
                                    </div>
                                    <div>

                                        <div >
                                            <p>Owner : {myRent.owner.username}</p>
                                            <p>Client : {myRent.client.username}</p>
                                        </div>

                                        <div >
                                            {myRent.fristDay}
                                        </div>
                                        <div >
                                            {myRent.lastDay}
                                        </div>

                                        <div>
                                            Rating:
                                            <Rater total={5} rating={myRent.rating} onRate={(rating) => { this.handleChange(rating, idx) }}/>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
