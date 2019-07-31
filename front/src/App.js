import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'

import Navbar from './Componets/Navbar/Navbar';
import Login from './Componets/Login/Login';
import Signup from './Componets/Signup/Signup';
import Profile from './Componets/Profile/Profile';
import AuthServices from './Services/Services'
import Listproducts from './Componets/ListProducts/Listproducts';
import ProductDetail from './Componets/ProductDetail/ProductDetail';
import ProductsOwner from './Componets/ProducOwner/ProductsOwner';
import MyProducts from './Componets/MyProducts/MyProducts';
import Messages from './Componets/Messages/Messages';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterQuery: "",
      loggedInUser: null,
    };
    this.service = new AuthServices();
  }

  componentDidMount() {
    this.fetchUser()
  };

  getTheUser = (userObj) => {
    this.setState({
      ...this.state,
      loggedInUser: userObj,
    })
  };

  logout = (e) => {
    e.preventDefault();
    this.service.logout()
        .then(() => {
          this.setState({
            loggedInUser: null
          })
        })
  };

  fetchUser = () => {
    this.service.loggedin()
        .then(response => {
            this.setState({
              loggedInUser: response
            })
          // }
        })
  };

  filterProducts(filterQuery) {
    this.setState({
      ...this.state,
      filterQuery: filterQuery
    });
  }

  render() {
    // If the user is not logged, just allow him to go to login and sing up.
    console.log(this.state.loggedInUser)
    if (!this.state.loggedInUser) {
      return (
          <React.Fragment>
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
          <Navbar filterProducts={(q) => this.filterProducts(q)} filterQuery={this.state.filterQuery} getTheUser={this.getTheUser} logout={this.logout}>
          </Navbar>
          <Switch>
            <Route exact path='/login' render={() => {
              return <Redirect to="/products" />
            }} />
            <Route exact path='/singup' render={() => {
              return <Redirect to="/products" />
            }} />
            <Route exact path='/profile' render={() => {
              return <Profile {...this.state.loggedInUser} logout={this.logout} />
            }} />
            <Route exact path='/products' render={() => {
              return <Listproducts getFilterQuery={() => { return this.state.filterQuery }} />
            }} />
            <Route exact path='/product/:id' component={ProductDetail} />
            }} />
            <Route exact path='/user/:id/products' component={ProductsOwner} />
            }} />
            <Route exact path='/myproducts' render={() => {
              return <MyProducts {...this.state.loggedInUser} getUser={this.getTheUser} />
            }} />
            <Route exact path='/messages' render={() => {
              return <Messages loggedInUser={this.state.loggedInUser}/>
            }} />
          </Switch>
        </React.Fragment>
    );
  }
}

export default App;