import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthServices from '../../Services/Services'
import './Signup.css'

export default class Signup extends Component {

  constructor(props){
    super(props);
    this.state = { 
      username: '', 
      password: '',
      city:'',
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

  this.service.signup(username, password,city,email)
  .then( response => {
      this.setState({
          username: "", 
          password: "",
          city:"",
          email: "",
      });
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

        <div className="form-group">
        <label>City:</label>
        <input type="text" name="city" placeholder="City" value={this.state.city} onChange={ e => this.handleChange(e)}/>
        </div>

        <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
        </div>

        <input className="btn btn-primary btn-lg" type="submit" value="Signup" />
      </form>

      <p>Already have account? 
          <Link to={"/login"}> Login</Link>
      </p>

    </div>
  )
}
}