import React, { Component } from 'react';
import AuthServices from '../../../Services/Services';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class UploadRent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: this.props._id,
            owner: this.props.owner,
            client: "",
            fristDay: new Date(),
            lastDay: new Date(),
            estatus: "pending"
        };
        this.service = new AuthServices();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            fristDay: date,
            lastDay: date,
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const product = this.props._id;
        const owner = this.state.owner;
        const client = this.state.client;
        const fristDay = this.state.fristDay;
        const lastDay = this.state.lastDay;

        this.service.addRent(product, owner, client, fristDay, lastDay)
            .then(res => {
                console.log('added: ', res);

                this.props.uploadProductDidAddProduct(res);
                document.getElementById(this.image).value = "";
                this.setState({
                    product,
                    owner,
                    client,
                    fristDay,
                    lastDay,

                })
            })

            .catch(err => {
                console.log("Error while adding the thing: ", err);
            });
    }

    render() {
        return (
            
                <React.Fragment>


                    <div className="drop3">
                        <div className="box">
                            <form className="form1" onSubmit={this.handleFormSubmit}>
                                <div>
                                    <DatePicker
                                    
                                        selected={this.state.fristDay}
                                        onChange={this.handleChange}
                                        dateFormat="dd/MM/yyyy"
                                       
                                    />

                                </div>
                                    <div>
                                      <DatePicker
                                        selected={this.state.lastDay}
                                        onChange={this.handleChange}
                                        isClearable={true}
                                    />

                                    </div>
                                <div>
                                    <button id="add" className="button" onClick={(e) => this.handleSubmit(e)}>Add</button>
                                </div>
                        </form>
                    </div>

                  </div>
            </React.Fragment>
        )
    }
}
