import React, { Component } from 'react';
import './Profile.css';
import AuthServices from '../../Services/Services';


export default class Profile extends Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            username: this.props.username,
            password: this.props.password,
            city: this.props.city,
            email: this.props.email,
            photo: this.props.photo,
            editing: false
        }
        this.service = new AuthServices();
    }

    editButtonClicked = () => {
        if (this.state.editing) {
            this.updateUser()
        }

        this.setState({
            ...this.state,
            editing: !this.state.editing
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    updateUser = () => {
        console.log(this.props._id)
        this.service.updateUser(
            this.props._id,
            this.state.username,
            // this.state.password,
            this.state.city,
            this.state.email,
        )
            .then((response) => { console.log("Updated!", response) })
            .catch((err) => { console.log(err) })
    }

    render() {
        return (
            <div className="profile">
                <div className="profile-body">
                    <div className="profile-body-left">
                        <img id="avatar" src={this.state.photo} />
                    </div>
                    <div className="profile-body-right">

                        <div className="tittle-profile">
                            <h1>Hello {this.props.username} </h1>
                        </div>
                        <div>
                            <div className="my-dates">
                                <p className="left-label">Name</p>
                                {this.state.editing ?
                                    (<input className="form-control" type="test" name="username" value={this.state.username} onChange={this.handleChange} />) :
                                    (<p>{this.state.username} </p>)
                                }

                            </div>

                            <div className="my-dates">
                                <p className="left-label">City </p>
                                {this.state.editing ?
                                    (<input className="form-control" type="text" name="city" placeholder="City" value={this.state.city} onChange={this.handleChange} />) :
                                    (<p>{this.state.city}</p>)
                                }
                            </div>

                            <div className="my-dates">
                                <p className="left-label">Email</p>
                                {this.state.editing ?
                                    (<input className="form-control" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />) :
                                    (<p>{this.state.email}</p>)
                                }
                            </div>
                            <div className="button-container">
                                {this.state.editing ?
                                    (<button id="button" className="button-profile" onClick={this.editButtonClicked}>Save</button>) :
                                    (<button id="button" className="button-profile" onClick={this.editButtonClicked} >Edit your data</button>)
                                }
                                <button id="button" className="button-profile" onClick={(e) => { this.props.logout(e) }}>Logout</button>

                            </div>

                        </div>
                    </div>



                </div>

            </div>
        )
    }
}
