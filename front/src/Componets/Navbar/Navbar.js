import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import rento from '../Assets/logo-white.png';

class Navbar extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            filterQuery: props.filterQuery
        }
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({filterQuery: value})
    };

    searchButtonClicked = (e) => {
        this.props.filterProducts(this.state.filterQuery)
    };

    homeButtonClicked = (e) => {
        this.props.filterProducts("");
        this.setState({filterQuery: ""})
    };

    render() {
        return (
            <nav className="navbar">
                <div className="nav-left-item">
                    <Link to={"/products"} className="navbar-brand" onClick={ e => this.homeButtonClicked(e) }>
                        <img src={rento} alt="logo" className="logo" />
                    </Link>

                    <form className="form-inline">
                        <input className="form-control mr-sm-2 search" type="search" name="search" placeholder="Search" aria-label="Search" onChange={ e => this.handleChange(e)} value={this.state.filterQuery} />
                        <Link className="btn btn-light" onClick={ e => this.searchButtonClicked(e) } to={"/products"}>Search</Link>
                    </form>
                </div>

                <div className="nav-right-item">
                    <Link to={"/profile"}>
                        <p>Hello {this.props.loggedInUser.username}</p>
                    </Link>

                    <Link to="/myproducts">
                        <p>My Products</p>
                    </Link>

                    <Link to={"/user/"+this.props.loggedInUser._id+"/myrents"}>
                        <p>My Rents</p>
                    </Link>

                    <Link to={"/messages"}>
                        <p>Messages</p>
                    </Link>
                  
                </div>
            </nav>
        )
    }
}

export default Navbar;
