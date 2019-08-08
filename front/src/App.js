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
import { StreamChat } from 'stream-chat';
import MyRents from './Componets/MyRents/MyRents';



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

  loadChat = () => {
    console.log("Load chat to", this.state.loggedInUser.username)
    // creamos cliente (clase) a partir de nuestra api key
    let chatClient = new StreamChat('476rbkbracqc');
    //con esto nos logeamos en el cliente, le pasamos el id, el nombre y la imagen del avatar del usuario logado y el token
    chatClient.setUser({
      id: this.state.loggedInUser.username,
      name: this.state.loggedInUser.username,
      image: this.state.loggedInUser.photo
    }, this.state.loggedInUser.chatToken);
  }

  fetchUser = () => {
    this.service.loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response
        })
        this.state.loggedInUser = response;
        this.loadChat()
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
        <Navbar filterProducts={(q) => this.filterProducts(q)} loggedInUser={this.state.loggedInUser} filterQuery={this.state.filterQuery} getTheUser={this.getTheUser} logout={this.logout}>
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
          <Route exact path='/product/:id' render={(props) => {
            return <ProductDetail productId={props.match.params.id} loggedInUser={this.state.loggedInUser}/>
          }} />
            <Route exact path='/user/:id/products' component={ProductsOwner} />
          }} />
            <Route exact path='/myproducts' render={() => {
            return <MyProducts {...this.state.loggedInUser} getUser={this.getTheUser} />
          }} />
          <Route exact path='/messages/:id' render={(props) => {
            return <Messages loggedInUser={this.state.loggedInUser} productId={props.match.params.id} />
          }} />
          <Route exact path='/messages' render={(props) => {
            return <Messages loggedInUser={this.state.loggedInUser} />
          }} />

          <Route exact path='/user/:id/myrents' render={() => {
            return <MyRents {...this.state.loggedInUser} getUser={this.getTheUser} />
          }} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;