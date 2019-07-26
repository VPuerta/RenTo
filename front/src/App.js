import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'

import Navbar from './Componets/Navbar/Navbar';
import Login from './Componets/Login/Login';
import Signup from './Componets/Signup/Signup';
import Profile from './Componets/Profile/Profile';
import AuthServices from './Services/Services'
import Listproducts from './Componets/ListProducts/Listproducts';
import axios from 'axios';
import ProductDetail from './Componets/ProductDetail/ProductDetail';
import ProductsOwner from './Componets/ProducOwner/ProductsOwner';
import MyProducts from './Componets/MyProducts/MyProducts';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user:"",
      prodcuts: [],
      filterQuery: "",
      filteredProducts: [],
      loggedInUser: null,
    }
    this.service = new AuthServices();
  }


  getAllProducts = () => {
    axios.get(`http://localhost:5000/products/`)
      .then(allProducts => {
        console.log(allProducts)
        this.setState({
          ...this.state,
          prodcuts: allProducts,
          filterQuery: "",
          filteredProducts: allProducts,
          loggedInUser: null,
        })
      })
  }

  componentDidMount() {
    this.getAllProducts();

    this.service.loggedin().then(useData => {
      if (useData) {
        this.setState({
          loggedInUser: useData
        })
      } else {
        this.setState({
          loggedInUser: null
        })
      }
    })
  }

  getTheUser = (userObj) => {
    this.setState(
      {
        ...this.state,
        loggedInUser: userObj,
      })
  }

  logout = (e) => {
    e.preventDefault()
    this.service.logout()
      .then(() => {
        this.setState({
          loggedInUser: null
        })
      })
  }

  fetchUser = () => {
    this.service.loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response
        })
      })
  }

  filterProducts(e) {
    const filter = e.target.value
    let filteredProducts = this.state.products.filter((product) => {
      return product.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    })
    this.setState({
      ...this.state,
      filterQuery: filter,
      filteredProducts: filteredProducts,
    })
  }

  render() {
    // If the user is not logged, just allow him to go to login and sing up.
    if (!this.state.loggedInUser) {
      return (
        <React.Fragment>
          <Navbar
            filterProducts={(e) => this.filterProducts(e)}
            filterQuery={this.state.filterQuery}>
          </Navbar>
          <Switch>
            <Route exact path='/login' render={() => {
              return <Login {...this.state.loggedInUser} getUser={this.getTheUser} />
            }} />
            <Route exact path='/signup' render={() => {
              return <Signup {...this.state.loggedInUser} getUser={this.getTheUser} />
            }} />
            <Route render={() => {
              return <Redirect to="/login" />
            }} />
          </Switch>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Navbar filterProducts={(e) => this.filterProducts(e)}
          filterQuery={this.state.filterQuery} getTheUser = {this.getTheUser}>
        </Navbar>
        <Switch>
          <Route exact path='/login' render={() => {
            return <Redirect to="/profile" />
          }} />
          <Route exact path='/profile' render={() => {
            return <Profile {...this.state.loggedInUser} logout={this.logout} />
          }} />
          <Route exact path='/signup' render={() => {
            return <Redirect to="/login" />
          }} />
          <Route exact path='/products' render={() => {
            return <Listproducts products={this.props.products} />
          }} />
          <Route exact path='/product/:id' component={ProductDetail} />
          }} />
          <Route exact path='/user/:id/products' component={ProductsOwner} />
          }} />
          <Route exact path='/myproducts' render={()=> <MyProducts {...this.state.loggedInUser} />} />
          }} />
        </Switch>
      </React.Fragment>
    );
  } 
}

export default App;