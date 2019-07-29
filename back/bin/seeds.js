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
      avatar:"https://image.freepik.com/vector-gratis/perfil-avatar-mujer-icono-redondo_24640-14047.jpg",
      username: "Vanesa",
      password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
      email: "vanesa.p@hotmail.com",
      products:[],
      city: "Madrid",
      rating:[7,6],
      average: 6.5,
      // location:{
      //   lat: 40.416775,
      //   lng: -3.703790
      // }
    },
    {
      _id: idChema,
      avatar:"https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg",
      username: "Chema",
      password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
      email: "chema.p@hotmail.com",
      products:[],
      city: "Sevilla",
      rating:[6,8],
      average: 7,
      // location:{
      //   lat: 40.416775,
      //   lng: -3.703790
      // }
    }
  ]
  
  let products = [{
    name: "Bicicleta",
    owner: idVane,
    category: 'Sport',
    description: "chulisima, de montaña, para todos los domingos",
    price: 30,
    days:1,
    // pictures: [{
    //   imgName: "https://cdn.wallapop.com/images/10420/68/0r/__/c10420p376269898/i911649266.jpg?pictureSize=W640",
    //   imgPath: "Bicicleta",
    // }],
    imageUrl: "https://cdn.wallapop.com/images/10420/68/0r/__/c10420p376269898/i911649266.jpg?pictureSize=W640",

    position:{
      lat: 41.3977381, 
      lng: -0.3 
    },
  },  
  {
    name: "Barbacoa",
    owner: idVane,
    category: 'Other',
    description: "Como me gusta la barbacoa",
    price: 39,
    days:1,
    // pictures: [{
    //   imgName:"https://images.vibbo.com/635x476/094/09403867981.jpg",
    //   imgPath: "barbacoa",
    // }],
    imageUrl:"https://images.vibbo.com/635x476/094/09403867981.jpg",
    position:{
      lat: 40.3977381, 
      lng: -0.3 
    },
  },
  {
  name: "zapatillas",
  owner: idChema,
  category: 'Sport',
  description: "nuevasss",
  price: 15,
  days:1,
  // pictures: [{
  //   imgName: "https://www.runnea.com/archivos/201609/runnea-news-runtastic-miszapatillas-1-840xXx80.jpg?0",
  //   imgPath: "zapas",
  // }],
  imageUrl:"https://www.runnea.com/archivos/201609/runnea-news-runtastic-miszapatillas-1-840xXx80.jpg?0",
  position:{
    lat: 41.3977381, 
    lng: -0.4 
    },
  },
  {
  name: "Tabla de Surf",
  owner: idChema,
  category: 'Sport',
  description: "Wapisima",
  price: 35,
  days:1,
  // pictures: [{
  //   imgName: "https://cdn.wallapop.com/images/10420/69/h9/__/c10420p378719200/i923510105.jpg?pictureSize=W640",
  //   imgPath: "Tabla Surf",
  // }],
  imageUrl: "https://cdn.wallapop.com/images/10420/69/h9/__/c10420p378719200/i923510105.jpg?pictureSize=W640",
  position:{
    lat: 41.3977381, 
    lng: -0.4 
  },
  },
]
  
  
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