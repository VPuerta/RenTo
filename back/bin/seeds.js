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
        photo: "https://picsum.photos/id/1014/300/300",
        username: "vane",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
        email: "vanesa.p@hotmail.com",
        city: "Madrid",
        rating:[7,6],
        chatToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmFuZSJ9.I8qXfZD9YrEtj5cVYdTKAmOPfh77w8R3UOFCFPvvACY"
    },
    {
        _id: idChema,
        photo:"https://picsum.photos/id/1005/300/300",
        username: "chema",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
        email: "chema.p@hotmail.com",
        city: "Madrid",
        rating:[6,8],
        chatToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2hlbWEifQ.N41hjaWg_R8IxZrTpHcy3DWDi4RAonCIOBoPIEH7sk4"
    },
    {
        _id: idNoe,
        photo:"https://picsum.photos/id/1027/300/300",
        username: "noe",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
        email: "noe.p@hotmail.com",
        city: "Sevilla",
        rating:[6,8],
        chatToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibm9lIn0.wd2wq7DJWhLE-j792ukR5O82Xeq0qfEuWy47Y6FNIfU"
    },
    {
        _id: idMaria,
        photo:"https://picsum.photos/id/1062/300/300",
        username: "maria",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
        email: "mari.p@hotmail.com",
        city: "Sevilla",
        rating:[6,8],
        chatToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibWFyaWEifQ.jCQg6j7DUSHW1UAtmrfIWqMz5DYfVQbEBdhn3L0eOho"
    }
]

let products = [
    {
        name: "Broca",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/263/300/300",
        category: "Home",
        description: "Laborum nisi adipisicing quis reprehenderit.",
        price: 29,
        position: {
            lat: 29.199095,
            lng: -133.148011
        }
    },
    {
        name: "Vestino",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/156/300/300",
        category: "Fashion",
        description: "Id veniam do nostrud consequat dolor aute dolore sunt Lorem.",
        price: 153,
        position: {
            lat: 52.339665,
            lng: -127.204661
        }
    },
    {
        name: "Zapatillas",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/364/300/300",
        category: "Sports",
        description: "Ea mollit consectetur et pariatur commodo.",
        price: 236,
        position: {
            lat: -26.66876,
            lng: 172.927182
        }
    },
    {
        name: "Bici",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/398/300/300",
        category: "Motor",
        description: "Ea deserunt consectetur eu excepteur magna irure ut laboris magna culpa.",
        price: 26,
        position: {
            lat: -66.51829,
            lng: 9.841846
        }
    },
    {
        name: "Broca",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/27/300/300",
        category: "Other",
        description: "Dolor aliqua velit aliquip qui ipsum laborum occaecat ea elit.",
        price: 56,
        position: {
            lat: 29.215261,
            lng: -96.049661
        }
    },
    {
        name: "Metrónomo",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/131/300/300",
        category: "Sports",
        description: "Tempor incididunt esse ea commodo.",
        price: 265,
        position: {
            lat: 54.40855,
            lng: -27.429064
        }
    },
    {
        name: "Monitor",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/297/300/300",
        category: "Fashion",
        description: "Dolor non quis adipisicing ut mollit id in mollit cillum ipsum irure irure proident aliqua.",
        price: 252,
        position: {
            lat: 37.618398,
            lng: 78.601033
        }
    },
    {
        name: "Vestino",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/276/300/300",
        category: "Other",
        description: "Irure culpa eiusmod magna aute.",
        price: 78,
        position: {
            lat: 60.517503,
            lng: 66.030016
        }
    },
    {
        name: "Caravana",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/109/300/300",
        category: "Home",
        description: "Et nulla ea ex ut labore amet nostrud velit elit labore aute.",
        price: 279,
        position: {
            lat: -88.449643,
            lng: 66.612135
        }
    },
    {
        name: "Metrónomo",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/4/300/300",
        category: "Books",
        description: "Dolore cupidatat amet ullamco officia veniam voluptate sunt anim quis elit anim dolor.",
        price: 239,
        position: {
            lat: 58.103951,
            lng: 170.094576
        }
    },
    {
        name: "Tabla de Snow",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/293/300/300",
        category: "Other",
        description: "Aute veniam veniam officia in aliquip Lorem id ea.",
        price: 253,
        position: {
            lat: 2.636249,
            lng: -17.537393
        }
    },
    {
        name: "Máquina de coser",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/260/300/300",
        category: "Home",
        description: "Quis laboris est velit exercitation.",
        price: 193,
        position: {
            lat: 69.84069,
            lng: 60.573285
        }
    },
    {
        name: "Vestino",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/248/300/300",
        category: "Other",
        description: "Enim qui excepteur fugiat officia eu dolore mollit laborum.",
        price: 31,
        position: {
            lat: 31.434572,
            lng: -156.594028
        }
    },
    {
        name: "Metrónomo",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/241/300/300",
        category: "Sports",
        description: "Culpa ex Lorem sunt eu.",
        price: 182,
        position: {
            lat: -6.193768,
            lng: 4.790571
        }
    },
    {
        name: "Moto",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/291/300/300",
        category: "Motor",
        description: "Pariatur eu dolor adipisicing id amet duis Lorem amet enim.",
        price: 205,
        position: {
            lat: -1.42332,
            lng: -171.721339
        }
    },
    {
        name: "Zapatillas",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/228/300/300",
        category: "Home",
        description: "Dolore Lorem dolore amet incididunt dolore incididunt aliqua.",
        price: 117,
        position: {
            lat: 22.844909,
            lng: 28.627814
        }
    },
    {
        name: "Broca",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/20/300/300",
        category: "Fashion",
        description: "Mollit nulla enim magna eu sit do sit incididunt nulla culpa.",
        price: 255,
        position: {
            lat: 80.017098,
            lng: -10.90237
        }
    },
    {
        name: "Máquina de coser",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/167/300/300",
        category: "Books",
        description: "Veniam culpa irure eu nostrud ipsum do aliqua nisi reprehenderit aliquip amet.",
        price: 257,
        position: {
            lat: 19.767716,
            lng: -153.884669
        }
    },
    {
        name: "Coche",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/43/300/300",
        category: "Fashion",
        description: "Ipsum aliquip fugiat cillum anim ea laborum Lorem sint in elit sint magna.",
        price: 21,
        position: {
            lat: -4.204999,
            lng: 160.74953
        }
    },
    {
        name: "Moto",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/305/300/300",
        category: "Motor",
        description: "Ullamco incididunt elit do occaecat.",
        price: 172,
        position: {
            lat: 61.447325,
            lng: 51.888083
        }
    },
    {
        name: "Mac",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/163/300/300",
        category: "Books",
        description: "Quis esse reprehenderit mollit cillum occaecat et deserunt laborum laboris.",
        price: 23,
        position: {
            lat: 24.644763,
            lng: -101.881389
        }
    },
    {
        name: "Vestino",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/394/300/300",
        category: "Books",
        description: "Anim nostrud occaecat deserunt exercitation enim pariatur aliqua.",
        price: 92,
        position: {
            lat: 47.587571,
            lng: -39.769956
        }
    },
    {
        name: "Broca",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/270/300/300",
        category: "Tools",
        description: "Excepteur commodo duis veniam aute dolore deserunt laboris ea ullamco quis ea.",
        price: 78,
        position: {
            lat: 84.909415,
            lng: 103.881484
        }
    },
    {
        name: "Tabla de Snow",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/4/300/300",
        category: "Home",
        description: "Fugiat cupidatat fugiat laborum enim voluptate.",
        price: 268,
        position: {
            lat: 80.136916,
            lng: 82.75094
        }
    },
    {
        name: "Caravana",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/301/300/300",
        category: "Fashion",
        description: "Mollit dolore pariatur aliqua voluptate quis ipsum do elit minim qui Lorem.",
        price: 173,
        position: {
            lat: -5.625378,
            lng: 19.938488
        }
    },
    {
        name: "Tabla de snow",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/393/300/300",
        category: "Sports",
        description: "Duis irure irure laborum culpa.",
        price: 293,
        position: {
            lat: -18.965821,
            lng: 146.758438
        }
    },
    {
        name: "Bici",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/53/300/300",
        category: "Other",
        description: "Magna quis sint excepteur nulla id nulla id minim et laboris occaecat fugiat dolore magna.",
        price: 199,
        position: {
            lat: 59.268833,
            lng: -115.066066
        }
    },
    {
        name: "Moto",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/136/300/300",
        category: "Books",
        description: "Commodo exercitation dolor cillum sit esse consequat.",
        price: 291,
        position: {
            lat: 34.768583,
            lng: 114.808399
        }
    },
    {
        name: "Zapatillas",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/94/300/300",
        category: "Home",
        description: "Cillum sit fugiat cupidatat est consectetur tempor eiusmod Lorem incididunt eiusmod.",
        price: 233,
        position: {
            lat: -4.527893,
            lng: -169.611581
        }
    },
    {
        name: "Monitor",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/54/300/300",
        category: "Other",
        description: "Fugiat veniam tempor do duis consectetur aliquip amet culpa quis anim aute ex sit dolor.",
        price: 131,
        position: {
            lat: 79.682805,
            lng: -57.25084
        }
    },
    {
        name: "Barbacoa",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/44/300/300",
        category: "Books",
        description: "Ad eiusmod mollit dolor qui commodo tempor esse nisi cupidatat elit.",
        price: 249,
        position: {
            lat: -23.352174,
            lng: 125.922433
        }
    },
    {
        name: "Vestino",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/34/300/300",
        category: "Fashion",
        description: "Nostrud fugiat aliqua exercitation labore in nostrud qui culpa enim ea laborum anim.",
        price: 164,
        position: {
            lat: -16.348773,
            lng: 4.925797
        }
    },
    {
        name: "Barbacoa",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/99/300/300",
        category: "Books",
        description: "Veniam consectetur nisi ullamco sint sint sit sit nulla consequat Lorem ad tempor dolore.",
        price: 255,
        position: {
            lat: -27.793935,
            lng: 87.961615
        }
    },
    {
        name: "Broca",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/279/300/300",
        category: "Tools",
        description: "Esse magna eu amet qui amet occaecat proident non.",
        price: 92,
        position: {
            lat: -13.02885,
            lng: 161.156339
        }
    },
    {
        name: "Tabla de Snow",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/231/300/300",
        category: "Home",
        description: "Ut proident aliquip aliquip do aliqua amet et anim ullamco.",
        price: 126,
        position: {
            lat: 89.485112,
            lng: 126.672375
        }
    },
    {
        name: "Coche",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/48/300/300",
        category: "Other",
        description: "Cillum laboris fugiat ea ut duis laboris voluptate magna in qui esse mollit.",
        price: 50,
        position: {
            lat: 47.522767,
            lng: 138.84029
        }
    },
    {
        name: "Bici",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/99/300/300",
        category: "Books",
        description: "Eiusmod sit anim voluptate proident non officia.",
        price: 54,
        position: {
            lat: -76.803258,
            lng: -167.178398
        }
    },
    {
        name: "Tabla de snow",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/32/300/300",
        category: "Tools",
        description: "Dolore incididunt aute nisi duis dolor exercitation ullamco non laboris nostrud.",
        price: 216,
        position: {
            lat: 18.193693,
            lng: -70.498178
        }
    },
    {
        name: "Moto",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/11/300/300",
        category: "Books",
        description: "Excepteur sunt commodo non nisi excepteur id ut proident amet officia qui commodo enim eu.",
        price: 148,
        position: {
            lat: 76.412466,
            lng: -18.018999
        }
    },
    {
        name: "Coche",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/2/300/300",
        category: "Fashion",
        description: "Minim incididunt dolor proident occaecat culpa.",
        price: 27,
        position: {
            lat: -37.904067,
            lng: -172.935608
        }
    },
    {
        name: "Broca",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/251/300/300",
        category: "Fashion",
        description: "Sit pariatur dolore minim minim officia ut.",
        price: 285,
        position: {
            lat: -67.629689,
            lng: 124.934129
        }
    },
    {
        name: "Máquina de coser",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/5/300/300",
        category: "Sports",
        description: "Adipisicing cillum irure sit sint sint.",
        price: 161,
        position: {
            lat: 23.166561,
            lng: -8.767719
        }
    },
    {
        name: "Monitor",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/77/300/300",
        category: "Tools",
        description: "Laboris ea tempor cillum dolor consequat minim id nisi nulla adipisicing.",
        price: 238,
        position: {
            lat: 48.548906,
            lng: 38.740307
        }
    },
    {
        name: "Vestino",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/232/300/300",
        category: "Other",
        description: "Nisi exercitation pariatur ea est reprehenderit adipisicing proident ea qui.",
        price: 218,
        position: {
            lat: 87.811846,
            lng: -66.523115
        }
    },
    {
        name: "Metrónomo",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/102/300/300",
        category: "Books",
        description: "Officia consectetur anim sit nostrud ex minim commodo fugiat exercitation adipisicing.",
        price: 145,
        position: {
            lat: -31.524,
            lng: 122.414301
        }
    },
    {
        name: "Coche",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/334/300/300",
        category: "Home",
        description: "Ea cupidatat nostrud nisi dolore qui non et ut sint veniam Lorem commodo duis labore.",
        price: 118,
        position: {
            lat: 31.223518,
            lng: -169.432873
        }
    },
    {
        name: "Barbacoa",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/340/300/300",
        category: "Fashion",
        description: "Consectetur qui cillum sint sunt aliqua exercitation.",
        price: 24,
        position: {
            lat: 16.568539,
            lng: 66.426654
        }
    },
    {
        name: "Broca",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/294/300/300",
        category: "Motor",
        description: "Dolore pariatur deserunt velit ea magna eu deserunt exercitation.",
        price: 77,
        position: {
            lat: -23.580328,
            lng: -74.159641
        }
    },
    {
        name: "Broca",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/205/300/300",
        category: "Other",
        description: "Cillum sint officia irure nostrud eu est laboris id proident deserunt reprehenderit commodo sint voluptate.",
        price: 154,
        position: {
            lat: 21.027576,
            lng: -95.956571
        }
    },
    {
        name: "Bici",
        owner: idMaria,
        imageUrl: "https://picsum.photos/id/24/300/300",
        category: "Motor",
        description: "Sit ad aute nulla sit sunt duis dolor anim irure id consectetur.",
        price: 21,
        position: {
            lat: -8.732278,
            lng: -15.725898
        }
    },
    {
        name: "Moto",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/197/300/300",
        category: "Tools",
        description: "Aute pariatur ex occaecat incididunt pariatur ea aliquip aute sit.",
        price: 189,
        position: {
            lat: -39.02833,
            lng: 122.38319
        }
    },
    {
        name: "Tabla de Snow",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/36/300/300",
        category: "Fashion",
        description: "Sunt et adipisicing nisi dolore nulla qui enim nulla proident.",
        price: 196,
        position: {
            lat: -57.606506,
            lng: -33.803906
        }
    },
    {
        name: "Caravana",
        owner: idVane,
        imageUrl: "https://picsum.photos/id/387/300/300",
        category: "Motor",
        description: "Quis ipsum anim officia eu culpa dolor sunt.",
        price: 244,
        position: {
            lat: -65.112706,
            lng: 150.743066
        }
    },
    {
        name: "Tabla de snow",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/201/300/300",
        category: "Books",
        description: "Cillum cupidatat tempor adipisicing consectetur non elit pariatur et enim ut aliquip pariatur occaecat culpa.",
        price: 184,
        position: {
            lat: 83.723488,
            lng: -103.260485
        }
    },
    {
        name: "TV",
        owner: idChema,
        imageUrl: "https://picsum.photos/id/173/300/300",
        category: "Home",
        description: "Minim fugiat excepteur elit aliqua consequat qui.",
        price: 133,
        position: {
            lat: -25.273063,
            lng: 15.153266
        }
    },
    {
        name: "Coche",
        owner: idNoe,
        imageUrl: "https://picsum.photos/id/32/300/300",
        category: "Other",
        description: "Officia qui cupidatat minim et et esse minim anim.",
        price: 105,
        position: {
            lat: 31.920067,
            lng: 178.764687
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