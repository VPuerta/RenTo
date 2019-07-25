import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'

import Navbar from './Componets/Navbar';
import Login from './Componets/Login';
import Signup from './Componets/Signup';
import Profile from './Componets/Profile';
import AuthServices from './Services/Services'
import Listproducts from './Componets/Listproducts';
import axios from 'axios';
import ProductDetail from './Componets/ProductDetail';
import ProductsOwner from './Componets/ProductsOwner';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
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
        filteredProducts: [],
        loggedInUser: null,
      })
    })
  }
  
  componentDidMount() {
    this.getAllProducts();
  }
  
  
  componentDidMount() {
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
          <Navbar filterProducts={(e) => this.filterProducts(e)}
            filterQuery={this.state.filterQuery}></Navbar>
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
          filterQuery={this.state.filterQuery}></Navbar>
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
            return <Listproducts />
          }} />
          <Route exact path='/product/:id' component={ProductDetail}/>
          }} />
          <Route exact path='/user/:id/products' component={ProductsOwner}/>
          }} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;