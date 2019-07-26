import React, { Component } from 'react';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    // this.state={

    // }
  }

  render() {
    return (
      <div>
        <h1>Hola {this.props.username}</h1>

        <div>
          <p>Informacion Publica</p>
        </div>
        <div>
          <div>
            <p>Name : {this.props.username} </p>
            <p>Password : {this.props.password} </p>
            <p>City : {this.props.city} </p>
            <p>Email : {this.props.email} </p>
          </div>
        </div>

        <button onClick={(e) => { this.props.logout(e) }}>LOGOUT</button>
      </div>
    )
  }
}
