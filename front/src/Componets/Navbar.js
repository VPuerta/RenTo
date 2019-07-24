import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/Services';
import '../Componets/Navbar.css'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
  }

  handleLogout = (e) => {
    this.props.logout()
  }

 

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
        <img src="/docs/4.3/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
        RenTo
        </a>
      <form className="form-inline">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange ={(e)=> this.props.filterProducts(e)}
        value={this.props.filterQuery}/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      </nav>
      )
    } else {
      return (
        <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
        <img src="/docs/4.3/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
        RenTo
      </a>
      <Link to={"/products"}>
        <h3>All Products</h3></Link>
      <form className="form-inline">
      <input className="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>
      </nav>
      )
    }
  }
}
export default Navbar;
