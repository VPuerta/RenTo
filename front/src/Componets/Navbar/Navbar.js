import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import rento from '../Assets/logo-white.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      products: [],
      loggedInUser: null
    };
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
          <Link to={"/login"} className="navbar-brand">
            <img src={rento} width="30" height="30" className="d-inline-block align-top" alt="" />
            RenTo
        </Link>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => this.props.filterProducts(e)}
              value={this.props.filterQuery} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
      )
    } else {
      return (
        <nav className="navbar navbar-light bg-light">
          <Link to={"/products"} className="navbar-brand">
            <img src={rento} width="30" height="30" className="d-inline-block align-top" />
            RenTo
          </Link>

          <form className="form-inline">
            <input className="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search" defaultValue={this.props.filterQuery} />
            <button className="btn btn-outline-primary" type="submit" onClick={e => this.props.filterProductHandler(e)}>Search</button>
          </form>

          <div className="nav-left-item">
            {/* <Link to={"/products"}>
              <p>All Products</p>
            </Link> */}

            <Link to={"/profile"}>
              <p>My Profile</p>
            </Link>

            <Link to="/myproducts">
              <p>My Products</p>
            </Link>
           
            
            <Link to={"/messages"}>
              <p>Messages</p>
            </Link>
          </div>
        </nav>
      )
    }
  }
}
export default Navbar;
