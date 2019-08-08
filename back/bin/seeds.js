// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Product = require("../models/Product");
const Rent = require('../models/Rent');

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
let idProduct1 = require("mongoose").Types.ObjectId();
let idProduct2 = require("mongoose").Types.ObjectId();
let idProduct3 = require("mongoose").Types.ObjectId();


// Hay que añadir un token + username que permita loquearse en el chat
let users = [
    {
        _id: idVane,
        photo: "https://picsum.photos/id/1014/300/300",
        username: "vane",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
        email: "vanesa.p@hotmail.com",
        city: "Madrid",
        chatToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmFuZSJ9.I8qXfZD9YrEtj5cVYdTKAmOPfh77w8R3UOFCFPvvACY"
    },
    {
        _id: idChema,
        photo:"https://picsum.photos/id/1005/300/300",
        username: "chema",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
        email: "chema.p@hotmail.com",
        city: "Madrid",
        chatToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2hlbWEifQ.N41hjaWg_R8IxZrTpHcy3DWDi4RAonCIOBoPIEH7sk4"
    },
    {
        _id: idNoe,
        photo:"https://picsum.photos/id/1027/300/300",
        username: "noe",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
        email: "noe.p@hotmail.com",
        city: "Sevilla",
        chatToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibm9lIn0.wd2wq7DJWhLE-j792ukR5O82Xeq0qfEuWy47Y6FNIfU"
    },
    {
        _id: idMaria,
        photo:"https://picsum.photos/id/1062/300/300",
        username: "maria",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
        email: "mari.p@hotmail.com",
        city: "Sevilla",
        chatToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibWFyaWEifQ.jCQg6j7DUSHW1UAtmrfIWqMz5DYfVQbEBdhn3L0eOho"
    }
];

let rents = [
    {
        product : idProduct1,
        owner: idVane,
        client: idNoe,
        firstDay: new Date(),
        lastDay: new Date(),
        rating: 0,
        status:"pending"
    },
    {
        product : idProduct2,
        owner: idVane,
        client: idNoe,
        firstDay: new Date(),
        lastDay: new Date(),
        rating: 0,
        status:"pending"
    },
    {
        product : idProduct3,
        owner: idNoe,
        client: idVane,
        firstDay: new Date(),
        lastDay: new Date(),
        rating: 0,
        status:"pending"
    },
    {
        product : idProduct3,
        owner: idVane,
        client: idMaria,
        firstDay: new Date(),
        lastDay: new Date(),
        rating: 0,
        status:"pending"
    }
];

let products = [
    {
        _id: idProduct1,
        name: "Drill",
        owner: idChema,
        imageUrl: "https://tecnofijacionescr.com/wp-content/uploads/2017/10/diamonddrillbit_opt-7.jpg",
        category: "Tools",
        description: "Laborum nisi adipisicing quis reprehenderit.",
        price: 15,
        rating: 5,
        position: {
            lat: 40.452405381636964,
            lng: -3.794417389140108
        }
    },
    {
        _id: idProduct2,
        name: "Dress",
        owner: idNoe,
        imageUrl: "http://www.fincaelrenacer.com/image/cache/data/category_6/JAEDEN%20Mujer%20Sin%20Tirantes%20Vestidos%20de%20Novia%20Largo%20Tul%20Vestido%20de%20Boda%20Blanco%20B0772T4937-500x500.jpg",
        category: "Fashion",
        description: "Id veniam do nostrud consequat dolor aute dolore sunt Lorem.",
        price: 153,
        rating: 0,
        position: {
            lat: 40.42738389676995,
            lng: -3.5578601988199807
        }
    },
    {
        _id: idProduct3,
        name: "Suit",
        owner: idNoe,
        imageUrl: "https://m.media-amazon.com/images/I/61WHhw1OjNL._SR500,500_.jpg",
        category: "Fashion",
        description: "Ea mollit consectetur et pariatur commodo.",
        price: 136,
        rating: 0,
        position: {
            lat: 37.34699094470703,
            lng: -6.064082439718504
        }
    },
    {
        name: "Bike",
        owner: idChema,
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51FuSAKPlNL.jpg",
        category: "Sports",
        description: "Ea deserunt consectetur eu excepteur magna irure ut laboris magna culpa.",
        price: 95,
        rating: 3,
        position: {
            lat: 37.37652138447502,
            lng: -5.958577205758502
        }
    },
    {
        name: "Scooter",
        owner: idMaria,
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/31DiS5Pe0ZL.jpg",
        category: "Motor",
        description: "Dolor aliqua velit aliquip qui ipsum laborum occaecat ea elit.",
        price: 116,
        rating: 4,
        position: {
            lat: 41.3918424684922 ,
            lng: 2.1796165646107966
        }
    },
    {
        name: "Tabla Surf",
        owner: idNoe,
        imageUrl: "https://surf3.es/wp-content/uploads/2017/04/s_seb_1.jpg",
        category: "Sports",
        description: "Tempor incididunt esse ea commodo.",
        price: 265,
        rating: 4,
        position: {
            lat: 41.39870363975131 ,
            lng: 2.1438277776843506
        }
    },
    {
        name: "Monitor",
        owner: idMaria,
        imageUrl: "https://gloimg.gbtcdn.com/soa/gb/pdm-product-pic/Electronic/2017/08/10/goods_img_big-v1/20170810140522_11462.jpg",
        category: "Other",
        description: "Dolor non quis adipisicing ut mollit id in mollit cillum ipsum irure irure proident aliqua.",
        price: 102,
        rating: 3,
        position: {
            lat: 39.45650701092683 ,
            lng: -0.4005064693216127
        }
    },
    {
        name: "Clean Code",
        owner: idVane,
        imageUrl: "https://m.media-amazon.com/images/I/515iEcDr1GL._SR500,500_.jpg",
        category: "Books",
        description: "Irure culpa eiusmod magna aute.",
        price: 15,
        rating: 5,
        position: {
            lat: 39.47559029639345 ,
            lng: -0.3256621089700502
        }
    },
    {
        name: "Caravan",
        owner: idChema,
        imageUrl: "http://expocaravan.es/image/cache/caravanas/453_IMG_3741%20[1024x768]-500x500.JPG",
        category: "Motor",
        description: "Et nulla ea ex ut labore amet nostrud velit elit labore aute.",
        price: 579,
        rating: 2,
        position: {
            lat: 37.879282657144216,
            lng: -4.788118703030136
        }
    },
    {
        name: "Algorithms",
        owner: idNoe,
        imageUrl: "https://m.media-amazon.com/images/I/61nhEc-QyGL._SR500,500_.jpg",
        category: "Books",
        description: "Dolore cupidatat amet ullamco officia veniam voluptate sunt anim quis elit anim dolor.",
        price: 13,
        rating: 5,
        position: {
            lat: 38.917458380803886 ,
            lng: -6.343280868697207
        }
    },
    {
        name: "Sewing Machine",
        owner: idMaria,
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/414C3%2BK5ptL.jpg",
        category: "Home",
        description: "Aute veniam veniam officia in aliquip Lorem id ea.",
        price: 100,
        rating: 1,
        position: {
            lat: 38.91883571976499 ,
            lng: -6.343012647795717
        }
    },
    {
        name: "Tools",
        owner: idVane,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdC6yPkCuxEy1TpUASRMPtnlrrtY82V_XvgXaveBphhyUiwn5i",
        category: "Tools",
        description: "Quis laboris est velit exercitation.",
        price: 153,
        rating: 5,
        position: {
            lat: 38.87466205752793 ,
            lng: -6.972593022908882
        }
    },
    {
        name: "Swimming Pool",
        owner: idChema,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVQlqw9z2YYNkVfxkeJVmSXHi5BTLGOJy8INcqh9W8mDzDBHIJ",
        category: "Other",
        description: "Enim qui excepteur fugiat officia eu dolore mollit laborum.",
        price: 131,
        rating: 5,
        position: {
            lat: 338.870268442674174 ,
            lng: -6.969417287435249
        }
    },
    {
        name: "Paddle Shovel",
        owner: idVane,
        imageUrl: "https://www.tiendapadelpoint.com/image/cache/data/pala-de-padel-jhayber-dominator-black-edition-2016-jhayber-2860-500x500.jpg",
        category: "Sports",
        description: "Culpa ex Lorem sunt eu.",
        price: 102,
        rating: 5,
        position: {
            lat: 43.26347597478862 ,
            lng: -2.93988930501132
        }
    },
    {
        name: "Barbecue",
        owner: idMaria,
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41bea4mBtUL.jpg",
        category: "Other",
        description: "Pariatur eu dolor adipisicing id amet duis Lorem amet enim.",
        price: 205,
        rating: 5,
        position: {
            lat:42.34269934935243 ,
            lng: -3.697099408269196
        }
    },
    {
        name: "Photo Camera",
        owner: idVane,
        imageUrl: "https://i.jessops.com/ce-images/product/product_enlarged/asonycm175318202.jpg",
        category: "Other",
        description: "Pariatur eu dolor adipisicing id amet duis Lorem amet enim.",
        price: 105,
        rating: 5,
        position: {
            lat: 40.34364654259477 ,
            lng: -3.751615249675069
        }
    },
];

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
        mongoose.disconnect();
        throw err
    });

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
        mongoose.disconnect();
        throw err
    });


Rent
    .deleteMany()
    .then(() => {
        return Rent.create(rents)
    })
    .then(rentsCreated => {
        console.log(`${rentsCreated.length} rents created with the following id:`);
        console.log(rentsCreated.map(u => u._id));
    })
    .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect()
    })
    .catch(err => {
        mongoose.disconnect()
        throw err
    });