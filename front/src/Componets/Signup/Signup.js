import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import AuthServices from '../../Services/Services'
import './Signup.css'
import logo from '../Assets/logo-white.png';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            city: '',
            email: '',
        };
        this.service = new AuthServices();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const city = this.state.city
        const email = this.state.email;

        this.service.signup(username, password, city, email)
            .then(() => {
                this.setState({
                    username: "",
                    password: "",
                    city: "",
                    email: "",
                });
                this.service.login(username, password)
                    .then(response => {
                        this.props.getUser(response)
                        this.props.history.push("/products")
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };


    render() {
        return (
            <div>
                <div className="login-clean">
                    <form onSubmit={this.handleFormSubmit}>
                        <h2 className="sr-only">Login Form</h2>
                        <div className="illustration">
                            <img className="rounded-circle" src={logo} width={150} alt="logo" />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" name="username" placeholder="Username" value={this.state.username} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" name="city" placeholder="City" value={this.state.city} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="email" name="email" placeholder="Email" value={this.state.email} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit" value="Signup" >Signup</button>
                        </div>
                        <p className="forgot">
                            Already have an account? <Link to={"/login"}>Log in</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Signup)