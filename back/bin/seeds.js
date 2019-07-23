// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Product = require("../models/Product");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/rento', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  let idVane = require("mongoose").Types.ObjectId();
  let idChema = require("mongoose").Types.ObjectId();
  
  let users = [
    {
      _id: idVane,
      username: "Vanesa",
      password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
      products:[],
      city: "Madrid",
      rating:[7,6]
      // location:{
      //   lat: 40.416775,
      //   lng: -3.703790
      // }
    },
    {
      _id: idChema,
      username: "Chema",
      password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
      products:[],
      city: "Sevilla",
      rating:[5,8]
      // location:{
      //   lat: 40.416775,
      //   lng: -3.703790
      // }
    }
  ]
  
  let products = [{
    name: "zapatillas",
    owner: idVane,
    category: 'Sport',
    description: "nuevasss",
    price: 20,
    days:1,
    picture: [{
      imgName: "https://www.runnea.com/archivos/201609/runnea-news-runtastic-miszapatillas-1-840xXx80.jpg?0",
      imgPath: "zapas",
    }],
  //   location: { type: { type: String }, coordinates: [Number] },
  // }, {
  },{
  name: "zapatillas",
  owner: idChema,
  category: 'Sport',
  description: "nuevasss",
  price: 15,
  days:1,
  picture: [{
    imgName: "https://www.runnea.com/archivos/201609/runnea-news-runtastic-miszapatillas-1-840xXx80.jpg?0",
    imgPath: "zapas",
  }]
  }]
  
  
  User
  .deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
  
  Product
  .deleteMany()
  .then(() => {
    return Product.create(products)
  })
  .then(productsCreated => {
    console.log(`${productsCreated.length} users created with the following id:`);
    console.log(productsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })