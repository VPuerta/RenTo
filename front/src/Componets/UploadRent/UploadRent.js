import React, { Component } from 'react';
import AuthServices from '../../Services/Services';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './UploadRent.css';
import {Link} from "react-router-dom";


export default class UploadRent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstDay: new Date(),
            lastDay: new Date(),
        };
        this.service = new AuthServices();

        this.handleChangeFirstDate = this.handleChangeFirstDate.bind(this);
        this.handleChangeLastDate = this.handleChangeLastDate.bind(this);
    }

    handleChangeFirstDate(date) {
        this.setState({
            ...this.state,
            firstDay: date,
        });
    }

    handleChangeLastDate(date) {
        this.setState({
            ...this.state,
            lastDay: date,
        });
    }


    handleSubmit = e => {
        e.preventDefault();
        console.log("handleSubmit", this.props);

        const product = this.props.product;
        const owner = this.props.product.owner;
        const client = this.props.loggedInUser._id;
        const firstDay = this.state.firstDay;
        const lastDay = this.state.lastDay;

        this.service.addRent(product, owner, client, firstDay, lastDay)
            .then(res => {
                this.props.history.push(`/user/${this.props.loggedInUser._id}/myrents`);
                this.setState({
                    product,
                    owner,
                    client,
                    firstDay,
                    lastDay,
                })
            })

            .catch(err => {
                console.log("Error while adding the thing: ", err);
            });
    };

    render() {
        return (
            <React.Fragment>
                <div className="head-card">
                    <form className="form1" onSubmit={this.handleFormSubmit}>
                        <div >
                            From:
                            <DatePicker className="date date-selector"
                                        selected={this.state.firstDay}
                                        onChange={this.handleChangeFirstDate}
                                        dateFormat="dd/MM/yyyy"
                            />

                        </div>
                        <div>
                            to:
                            <DatePicker className="date date-selector"
                                        selected={this.state.lastDay}
                                        onChange={this.handleChangeLastDate}
                                        dateFormat="dd/MM/yyyy"
                            />

                        </div>
                        <div className="button-container">
                            <button className="button-large" id="button-chat" onClick={(e) => this.handleSubmit(e)}>Request</button>
                            <Link to={"/messages/" + this.props.product._id }>
                                <button className="button-large" id ="button-chat">Chat</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
