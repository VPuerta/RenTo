import React, { Component } from 'react';
import AuthServices from '../../Services/Services'
import './Login.css'
import { Link } from 'react-router-dom';
import logo from './Assets/logo-white.png';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = { 
          username: '', 
          password: '' 
        };
        this.service = new AuthServices();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        this.service.login(username, password)
            .then( response => {
                this.setState({ username: "", password: "" });
                this.props.getUser(response)
            })
            .catch(error => console.log(error))
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render(){
        return(
            <div>
                <div className="login-clean">
                    <form onSubmit={this.handleFormSubmit}>
                        <h2 className="sr-only">Login Form</h2>
                        <div className="illustration">
                            <img className="rounded-circle" src={logo} width={150} alt="logo"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" name="username" placeholder="Username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={ e => this.handleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit" value="Login" >Log In</button>
                        </div>
                        <p className="forgot">
                            Don't have account? <Link to={"/signup"}> Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
