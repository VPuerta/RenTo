import React, { Component } from 'react';
import photo from '../Assets/photo.jpg'
import './Profile.css'

export default class Profile extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    console.log(props)
    // this.state={

    // }
  }

//   getImageName = (user) => {
//     let imgName;
//     if (user.image !== "") {
//         imgName = user.image
//     } else {
//         image = ""
//     }
//     return imgName;
// };

  render() {
    return (
      <div>
        <h1>Hola {this.props.username}</h1>

        <div>
          <p>Informacion Publica</p>
        </div>
        <div id="profile">
          <div>
          {/* <img src={this.getImageName(product)} className="card-img-top" alt={product.name} /> */}
          </div>
          <div>
            <div>
            {/* <img src={this.props.avatar} alt=""/> */}
            <img id ="avatar" src = {photo}/>
            </div>
            <div>
            <p>Name : {this.props.username} </p>
            <p>Password : {this.props.password} </p>
            <p>City : {this.props.city} </p>
            <p>Email : {this.props.email} </p>
            </div>
          </div>
        </div>

        <button onClick={(e) => { this.props.logout(e) }}>LOGOUT</button>
      </div>
    )
  }
}
