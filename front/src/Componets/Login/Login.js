import React, { Component } from 'react';
import AuthServices from '../../Services/Services'
import { Link, Redirect } from 'react-router-dom';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
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
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    
    return(
      <div className="form">
        <form onSubmit={this.handleFormSubmit}>

        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" placeholder="Name" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </div>

          <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </div>

          <input  className="btn btn-primary btn-lg" type="submit" value="Login" />
        </form>

        <p>Don't have account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
      
    )
    
  }
}
export default Login;
