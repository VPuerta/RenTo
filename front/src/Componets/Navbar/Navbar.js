import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import rento from '../Assets/logo-white.png';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: props.filterQuery
        }
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({search: value})
    };

    searchButtonClicked = (e) => {
        this.props.filterProducts(this.state.search)
    };

    homeButtonClicked = (e) => {
        this.props.filterProducts("");
        this.setState({search: ""})
    };

    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <Link to={"/products"} className="navbar-brand" onClick={ e => this.homeButtonClicked(e) }>
                    <img src={rento} width="30" height="30" alt="logo" className="d-inline-block align-top" />
                    RenTo
                </Link>

                <form className="form-inline">
                    <input className="form-control mr-sm-2 search" type="search" name="search" placeholder="Search" aria-label="Search" onChange={ e => this.handleChange(e)} value={this.state.search} />
                    <Link className="btn btn-outline-primary" onClick={ e => this.searchButtonClicked(e) } to={"/products"}>Search</Link>
                </form>

                <div className="nav-left-item">

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

export default Navbar;
