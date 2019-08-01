// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Product = require("../models/Product");

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGODB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  let idVane = require("mongoose").Types.ObjectId();
  let idChema = require("mongoose").Types.ObjectId();
  let idNoe = require("mongoose").Types.ObjectId();
  let idMaria = require("mongoose").Types.ObjectId();

// Hay que añadir un token + username que permita loquearse en el chat
let users = [
   {
     _id: idVane,
     photo:"https://picsum.photos/400/400",
     username: "Vanesa",
     password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
     email: "vanesa.p@hotmail.com",
     city: "Madrid",
     rating:[7,6],
	 chatToken: "TODO"
   },
   {
     _id: idChema,
     photo:"https://picsum.photos/400/400",
     username: "Chema",
     password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
     email: "chema.p@hotmail.com",
     city: "Madrid",
     rating:[6,8],
     chatToken: "TODO"
   },
   {
     _id: idNoe,
     photo:"https://picsum.photos/400/400",
     username: "Noelia",
     password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
     email: "noe.p@hotmail.com",
     city: "Sevilla",
     rating:[6,8],
	 chatToken: "TODO"
   },
   {
     _id: idMaria,
     photo:"https://picsum.photos/400/400",
     username: "Maria",
     password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
     email: "mari.p@hotmail.com",
     city: "Sevilla",
     rating:[6,8],
	 chatToken: "TODO"
   }
 ]

let products = [
  {
    name: "Tabla de snow",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Fashion",
    description: "Qui nostrud eiusmod reprehenderit eu laboris duis in irure proident consequat laborum aliquip.",
    price: 6675,
    position: {
      latitude: 80.009208,
      longitude: -136.413879
    }
  },
  {
    name: "Monitor",
    owner: "idMaria",
    imageUrl: "https://picsum.photos/400/400",
    category: "Sport",
    description: "Deserunt irure ullamco et minim eu consequat exercitation aliquip pariatur qui magna consequat laboris.",
    price: 8140,
    position: {
      latitude: 12.434866,
      longitude: -28.445741
    }
  },
  {
    name: "Bici",
    owner: idVane,
    imageUrl: "https://picsum.photos/400/400",
    category: "Motor",
    description: "Exercitation anim cupidatat non irure cillum sunt deserunt anim Lorem proident.",
    price: 7253,
    position: {
      latitude: 16.947954,
      longitude: -3.522734
    }
  },
  {
    name: "Broca",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Books",
    description: "Elit ipsum aliquip commodo incididunt eiusmod amet pariatur est cupidatat aliquip est.",
    price: 3280,
    position: {
      latitude: -71.333241,
      longitude: -122.214431
    }
  },
  {
    name: "Bici",
    owner: idChema,
    imageUrl: "https://picsum.photos/400/400",
    category: "Tools",
    description: "Anim fugiat aliquip id ut adipisicing cillum in veniam ex et fugiat ullamco et.",
    price: 7794,
    position: {
      latitude: -88.637597,
      longitude: -158.696018
    }
  },
  {
    name: "Bici",
    owner: "idMaria",
    imageUrl: "https://picsum.photos/400/400",
    category: "Tools",
    description: "Elit velit et nisi velit.",
    price: 6083,
    position: {
      latitude: 40.194401,
      longitude: 77.509042
    }
  },
  {
    name: "Monitor",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Home",
    description: "Esse incididunt quis anim incididunt aliquip elit quis.",
    price: 829,
    position: {
      latitude: -84.385628,
      longitude: -46.438982
    }
  },
  {
    name: "Coche",
    owner: idChema,
    imageUrl: "https://picsum.photos/400/400",
    category: "Computing",
    description: "Velit in excepteur in ut aliquip labore nisi nostrud eu pariatur amet anim deserunt Lorem.",
    price: 2342,
    position: {
      latitude: -17.247468,
      longitude: 169.792571
    }
  },
  {
    name: "TV",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Fashion",
    description: "Cillum Lorem consectetur cillum ea sint laborum ut nisi mollit eiusmod dolore proident dolor velit.",
    price: 3477,
    position: {
      latitude: -88.587236,
      longitude: 144.148037
    }
  },
  {
    name: "Barbacoa",
    owner: idChema,
    imageUrl: "https://picsum.photos/400/400",
    category: "Sport",
    description: "Consequat occaecat consectetur est elit veniam.",
    price: 7934,
    position: {
      latitude: -58.141449,
      longitude: 46.93206
    }
  },
  {
    name: "TV",
    owner: "idMaria",
    imageUrl: "https://picsum.photos/400/400",
    category: "Motor",
    description: "Labore id fugiat proident cillum qui amet duis laboris.",
    price: 6198,
    position: {
      latitude: 56.088768,
      longitude: -176.431327
    }
  },
  {
    name: "Moto",
    owner: idVane,
    imageUrl: "https://picsum.photos/400/400",
    category: "Books",
    description: "Ullamco Lorem nulla mollit et voluptate proident consectetur duis commodo eiusmod duis quis dolore.",
    price: 8549,
    position: {
      latitude: -56.995984,
      longitude: 140.174908
    }
  },
  {
    name: "Tabla de snow",
    owner: "idMaria",
    imageUrl: "https://picsum.photos/400/400",
    category: "Tools",
    description: "Ullamco commodo esse id laboris minim.",
    price: 5488,
    position: {
      latitude: -82.968533,
      longitude: 24.970682
    }
  },
  {
    name: "Bici",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Home",
    description: "Lorem quis consectetur nostrud et aliquip laborum dolore aute excepteur ex non nulla.",
    price: 9174,
    position: {
      latitude: 63.325121,
      longitude: 27.822431
    }
  },
  {
    name: "Moto",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Other",
    description: "Velit proident laborum fugiat elit laboris reprehenderit incididunt mollit nostrud fugiat.",
    price: 5388,
    position: {
      latitude: -86.382625,
      longitude: -20.546795
    }
  },
  {
    name: "Bici",
    owner: "idMaria",
    imageUrl: "https://picsum.photos/400/400",
    category: "Computing",
    description: "Tempor ea aliqua magna excepteur esse aute dolor consectetur deserunt.",
    price: 6363,
    position: {
      latitude: 62.92714,
      longitude: -128.783483
    }
  },
  {
    name: "Bici",
    owner: "idMaria",
    imageUrl: "https://picsum.photos/400/400",
    category: "Fashion",
    description: "Id qui irure sunt nulla labore eu duis amet consequat nulla duis voluptate.",
    price: 5200,
    position: {
      latitude: 85.58973,
      longitude: 75.229517
    }
  },
  {
    name: "Moto",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Sport",
    description: "Velit minim voluptate labore fugiat consectetur ad velit id commodo id culpa tempor.",
    price: 2464,
    position: {
      latitude: 77.06137,
      longitude: -6.691676
    }
  },
  {
    name: "TV",
    owner: idVane,
    imageUrl: "https://picsum.photos/400/400",
    category: "Motor",
    description: "Aliquip ea ut dolore amet labore.",
    price: 7851,
    position: {
      latitude: -47.891392,
      longitude: -16.945875
    }
  },
  {
    name: "Moto",
    owner: idVane,
    imageUrl: "https://picsum.photos/400/400",
    category: "Books",
    description: "Do et tempor voluptate minim laboris reprehenderit commodo cillum laborum consectetur.",
    price: 8129,
    position: {
      latitude: -15.699238,
      longitude: -168.868635
    }
  },
  {
    name: "Monitor",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Tools",
    description: "Magna et ad sit exercitation ut cupidatat irure ex aliquip.",
    price: 6831,
    position: {
      latitude: 70.262617,
      longitude: -54.101054
    }
  },
  {
    name: "Coche",
    owner: "idMaria",
    imageUrl: "https://picsum.photos/400/400",
    category: "Home",
    description: "Nulla duis aliqua reprehenderit in deserunt.",
    price: 9542,
    position: {
      latitude: -56.014762,
      longitude: -138.573268
    }
  },
  {
    name: "Monitor",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Sport",
    description: "Ut nostrud nostrud dolore quis ullamco officia cupidatat commodo sunt.",
    price: 1152,
    position: {
      latitude: -16.925392,
      longitude: 106.194994
    }
  },
  {
    name: "Tabla de snow",
    owner: idChema,
    imageUrl: "https://picsum.photos/400/400",
    category: "Sport",
    description: "Reprehenderit aliqua sunt reprehenderit et in exercitation pariatur velit.",
    price: 2848,
    position: {
      latitude: -23.36185,
      longitude: 50.067475
    }
  },
  {
    name: "Broca",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Other",
    description: "Laborum consectetur non anim minim do cillum fugiat.",
    price: 5139,
    position: {
      latitude: 1.135721,
      longitude: -139.69339
    }
  },
  {
    name: "Broca",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Other",
    description: "Sit est culpa amet ullamco aliqua eiusmod eu minim aute.",
    price: 479,
    position: {
      latitude: 79.095123,
      longitude: -16.626784
    }
  },
  {
    name: "Monitor",
    owner: idChema,
    imageUrl: "https://picsum.photos/400/400",
    category: "Tools",
    description: "Culpa et culpa mollit nulla laboris ipsum nulla.",
    price: 6585,
    position: {
      latitude: -47.962122,
      longitude: -3.799773
    }
  },
  {
    name: "Coche",
    owner: idVane,
    imageUrl: "https://picsum.photos/400/400",
    category: "",
    description: "Occaecat commodo do adipisicing nisi in in.",
    price: 6935,
    position: {
      latitude: -78.282415,
      longitude: -144.572624
    }
  },
  {
    name: "Tabla de snow",
    owner: idVane,
    imageUrl: "https://picsum.photos/400/400",
    category: "Fashion",
    description: "Enim in ut nisi aliquip eu non excepteur sunt veniam adipisicing esse cupidatat ea minim.",
    price: 5486,
    position: {
      latitude: 23.695161,
      longitude: -75.098962
    }
  },
  {
    name: "Coche",
    owner: idChema,
    imageUrl: "https://picsum.photos/400/400",
    category: "Sport",
    description: "Dolor qui quis minim qui est deserunt incididunt dolor Lorem.",
    price: 4135,
    position: {
      latitude: 70.675695,
      longitude: 107.912404
    }
  },
  {
    name: "Monitor",
    owner: idChema,
    imageUrl: "https://picsum.photos/400/400",
    category: "Motor",
    description: "Dolor consequat enim eiusmod nisi ea quis sit ad amet.",
    price: 1683,
    position: {
      latitude: -27.752509,
      longitude: 131.113573
    }
  },
  {
    name: "Barbacoa",
    owner: idVane,
    imageUrl: "https://picsum.photos/400/400",
    category: "Other",
    description: "Aute minim do deserunt aliqua ut in aute commodo labore est enim sint.",
    price: 2882,
    position: {
      latitude: 51.096582,
      longitude: -163.695496
    }
  },
  {
    name: "Monitor",
    owner: idChema,
    imageUrl: "https://picsum.photos/400/400",
    category: "Books",
    description: "Qui non velit aute irure do veniam fugiat sunt.",
    price: 8566,
    position: {
      latitude: 41.675295,
      longitude: 78.377316
    }
  },
  {
    name: "Barbacoa",
    owner: idChema,
    imageUrl: "https://picsum.photos/400/400",
    category: "Tools",
    description: "Id tempor esse excepteur dolore occaecat reprehenderit id nulla mollit dolor est.",
    price: 9141,
    position: {
      latitude: -18.425941,
      longitude: 143.511075
    }
  },
  {
    name: "Moto",
    owner: idNoe,
    imageUrl: "https://picsum.photos/400/400",
    category: "Home",
    description: "Anim nisi do anim nostrud Lorem dolor et quis reprehenderit.",
    price: 5519,
    position: {
      latitude: -75.368567,
      longitude: 102.844233
    }
  },
  {
    name: "Moto",
    owner: idVane,
    imageUrl: "https://picsum.photos/400/400",
    category: "Computing",
    description: "Laborum sunt commodo sint consectetur velit.",
    price: 5572,
    position: {
      latitude: 31.626481,
      longitude: 148.789464
    }
  },
  {
    name: "Coche",
    owner: idVane,
    imageUrl: "https://picsum.photos/400/400",
    category: "Other",
    description: "Cupidatat qui ipsum nisi esse dolor laboris dolore.",
    price: 387,
    position: {
      latitude: 12.611635,
      longitude: -117.564066
    }
  }
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