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
let idProduct= require("mongoose").Types.ObjectId();


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

let rents = [
    {
    product : idProduct,
    owner: idVane,
    client: idNoe,
    fristDay: new Date(),
    lastDay: new Date(),
    rating: 6,
}

]

let products = [
    {
        _id:idProduct,
        name: "Broca",
        owner: idChema,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Bohrer.jpg/220px-Bohrer.jpg",
        category: "Tools",
        description: "Laborum nisi adipisicing quis reprehenderit.",
        price: 15,
        position: {
            lat: 40.452405381636964,
            lng: -3.794417389140108
        }
    },
    {
        name: "Dress",
        owner: idNoe,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmgJxPq1XmdGWApo7D968r8yXy4xyshCqFcWKUNoJmIidk5dHEPw",
        category: "Fashion",
        description: "Id veniam do nostrud consequat dolor aute dolore sunt Lorem.",
        price: 153,
        position: {
            lat: 40.42738389676995,
            lng: -3.5578601988199807
        }
    },
    {
        name: "Suit",
        owner: idNoe,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ1GEctT4kY5S_WRjPvuk1BDuYeSo20ETvyBtxl8ARJoimyjt_3g",
        category: "Fashion",
        description: "Ea mollit consectetur et pariatur commodo.",
        price: 136,
        position: {
            lat: 37.34699094470703,
            lng: -6.064082439718504
        }
    },
    {
        name: "Bici",
        owner: idChema,
        imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMWFhUXFxoXGBgYFx0aGhgYFhcXFxcdGhcYHSggGBolGxcXITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xABGEAACAQIEAwYDBAcGBQMFAAABAgMAEQQSITEFQVEGEyJhcYEykaFCscHRFFJicoLh8AcjM1OS8RVjorLSRFRzJDQ1Q+L/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAoEQACAgEDBAICAgMAAAAAAAAAAQIRAxIhMQQTQVEiYTKBFKFxsdH/2gAMAwEAAhEDEQA/ALRwcn+W/wAv5UxsHJ+o3yP5VDHxjFf5h+Q/Ku47jmJWNmEmoB5Dlr0qHYfsbvoccG/6jf6TTGwhH2T8jWaHbvG/5g/0LRfh3anFNq7g6C1lH1ox6aTdWB9VGKtotGHqp+VRSYNDun0tV6DtBLe5Nx6D8q0GBl71c6ubc7qt9N+VNPpckOWLDrMc9kjGHAW+EuPf86cscg+1f1FFpePyBiFIK3sLqLkfKo5ePz5WZUQ5dW8OwuB1oz6PJGNtix67E5aUVVbzp2YdTVTEdsJrWCxAnQHJfKToDa+tqH8M4dxTE4jumxiRC187WUHyVFUXby0qMenlJakX/lQug33tcMlFH/s14lb/APKL7wafO5rK8Vg7hjG3FEml2KxMumuuYiEgel73tQWBvhjvOlyi+8rdKrviH8h71Ui4bNK4QSvnYgBczc/1rWsLa9fKqOM4bLHKYpHIytYlWYnltm0I9QfSmfTyi0mIupi1YSkxB5vb0qrJik/WY0Xjw2G5xE/xfyq/huBYaUXXwnpm1+6qy6PJDlEo9binsmZJ8YvJSfWoWx55KK2HEOzMES5nJ8gDr8qHLhsIPsSH3FGPTZJK4xs0uqxxdNme/SZDsPpT1Mx61ffieFuVVJgQbalaWGlSQEq7ixtawpI4ZylpitxpZ4RVtlLuZDuTXVg6n61bnhIUt3psBfVfyruAgidc7z2W9vgNNLDkhygRzQlwyuI16iu5fK9H8JhuHn/1ij1Qj8KJxcNwRF1xcR9dPvqTUl4KKUX5MgqHpTxhieVa0YDDfZxeHP8AGB+NRNwok2jlic8grXPyFLcvQ3x9mWbBmq8kVG+IYOZDZgB72++1DBh3Y6KT7j86KjJ+Dao+yl3RpwwxoinDJf8ALb6fnSkikTeNvlf7qzUvQylH2VEwfU05sGOtOMzH7Df6T+VPSB2+y3+k0rTXIylF8FCSEctajZbnTYaD8T7mr2KQILt4bnKPXnbz5e9cQdfCOQG/8qpdRr2TS1Sv0VhhzSq1nTqfmaVTspRoVlFcxMeZGUc1NQLFrYUVwHDTub12N0eYtzyvQaVo+CYpYWDlcwtYqeYNAcR/it0zt/3Gj8Tr3beG+nyoz4Fih0/HY+8ORCFvoOlFMDxwqpyGwO9YdNWotgzpTzzSUSCwxu0HDi1ovDxqCPByRgXklBB/Cso5v+NRX39alLPPItMhoY445Wivj2HWi03alpggaNcyixcE+IDa461nMW/iNMw9Ug3FWuQySkqYaxuPU6MCwO6ljl/0XtQmadi6KCqg3ChFyjNY5M2puCQBy3qN3uabIhI03Go9RqK0/lu+R8cnHbwbfsp2nWL+8MYJKDLpsdzz0odxDGNNM0rWuzZiOXpQXhL3BB0IO3k2o/Grz1Gc3KVsKWj4o2PGUgCJLG3xbp+qbfShmFx2RwykXFAGkO1NjY610w6uShpas58nTxctS2NTxjixnYMwAsLaUzhUSPKiswUXuSeg1NZuR6HYmc5tCR708eqlp0xVCvBc9UnYW7ZPGcXIYbZDYC21wADtVrsti40R0kTMGsQRuGHnppWbU3NqMQrlWuWT0VXJ03ZZ4hiroy9Rah0MEhjyrsSDv0v+dMx+Jv8AOjEIKRof2QT71Z5Zz3kJjgo8A1OCYg6hD86dNgp0VRlN761fwnbRgoPdgi7LlzWYZeZJ0sR5UQ4PLjeIOe6iijRTZpGYuF0uLKAuZrdDUnkb5Ont+jJxYeQG7Ctf2IRkxKu6sq5SLkcztpvWd7SxzYSd4JZcz2DBlBHhb4SLfCdCMvlzvVDFY8lAEKlyADaBLgWsSZCl7+e99d6nKKe48Y0a3+0Pi8LzgLKGyjax0J1PLpaskmKVpUQMQDe5uV1Og10IA1NXuB9n2xhaOJ1WZQuQOxyyAqSyZtSrLa4OtwSDa16rcS4BNh5WjxOVGj5KQQbi4N9rWNI6uw7Lcm/SJUFxI9rkA5jqFYrffqKjPFZech++oeHuXQAm4UlRrfTe49avfo610d+NU0c7Uk3TKq9oJ1PhfT92imB7YYu4F1+VVP0RdK4cKvLSpvJH0Opy9mr7QcTjSXDsqqxECOSTcGR7s7W63+6qsvau48UaH2FZ6djZbn4Rb+H+RqrPBmG9Slaf0Ophw9o4/wD2y/IfnSoGmBUi9Kh3F6GtnpXDMDbUi/tWgiRbHyFQKoUUjOAD56fSnbsCVI8VC3lPLxn7zRWdbISp1233+dU+IYTK0pF/BIflfSq/6SWtt7n8Sa6Wr4Oa6IsOmtFoVsKHRL6USjGlTyARIpAN6biBYX6612qmOl5VOMbZmDZTcmlnsK5TlFdQookuav4eAVHDFV1NBepTkYpxFxJmc3BOQEm5OUXXTe1rja2lWydaGYgSNIiRRjNJbL+szKbjVycpIOwI3Gg2rSxcAxRaz4eSO4zAtkOnLQPzsfkaVRb4K5GtnYNJvSXzq4ODYoaGJF/fniH0DGuY/hrxxF2aG6qSy9+l9P1Qty/yFFwYlp8A3FyWuKH7mpu7zgnv8OCLkhpLHTpmAzE9Bc1TfEhTYSKbcwpIPp4hTJpFOzIJYWKwvV6V9DTMFxjAKq545pGCkkjw3ey2Gj6LcuOZ8K73NXoePcLJ/vMLiiNPgK30C3Hie1iVJvv47aWuUe7s3aZnZDc+9bTEgZQAPsgfIUJm41wzTu8DiTYgjNIASbbGzEEX12pY7iBksg4diRbX/wC4db3tuVS3La/PaqbCU1tX+v8AoJ4nh4w0xcA6LKi5hckeFlAJzFbAk8rCvQOxeKaCMNhgoiks+XLa9wNdNb209qxkXDYcTmiWGSDGp4ljklaQTpbxIpfZ7XI5Gx9jv9m2Pk7mWDIGaBibMxUhGudbAn4g2gFJLZF4u/poO9qeH/8AE2DhFjni/u1e/hl55GNvCQzWDa6lh5jK8K7FY+SRopQ2HjUjMWAJb9wDR9PtXt67Vq8NG98NGP7yZnjdgossSs2d3K6ksWvdmOxa2W9jqu0pxDYiJY0LRZD31sovcHKLsQfkedSsr4MX2S4GE4mI4QTHC5kZr30MeULfqCxFulU/7SmSXGy8wAqG3VQL/l7UQ/TJeHiREjCyvHGpYeIJrIxy8juB7e1ZOW+pNydyTuSTc3pV7FzOKlUd0UYV8Ul+bZvXMB+N6tOtOyeVcZaJzuxRNr7W+lMybVJHGTewNSCE2rUGKbKc6VWTDcr7UUXDMarvHZr8qaPyWk3G52PDi3OlUwjPKlXPuUPR+IzjUg0CxeKJ0BrhZzobmo48MWOx033/ACroToZxszXEcKS8g/W129POq+C4JnOp28tfvox2ghCykDy+4VNwUAEXG42pceZ66Izx0gbhuE6nfTp/IWqUYOwNGcbLFAf7w5VI0A6+Sjc1msVxdnJWJT7jM3uNl9zVsqryJjg5FmPC332qhj+HktvpfyNve9/pVnB8Dxs/wo5H8RHySy/WrY7EYvw3RrsbLaK9yATa5bewPyqcZpFew/YLg4ZmtZS3v/K1W14A25Vj5D8zapJeyuIibxI+m47l1Nv3kLZfW1dw88yi6SsQNSMwmUeoID/IVZZl5El08vDOf8HZbmxtv6fjXcRwwnCCcG98QIHXTRe6Ml78ybWt0NWX7ROYXCwqz5Ws6ElQFF3JU+JQBc7+4ofwYSywO5sIIbysrGweQKAnmC2ZUFgTvbWhJJv4sEYOKbkRYrGfoy51W8xW6kbwxt4c/kzahfLMelUsKTioy+JlllIc3DyOQDbSwJsPDTFlJZmktIXN3B0Dfs3BuFt4RbYVf7SYWGGRWwq5IJ0zKudnytGbEZmN9UaJiCTYsRyoST4QYRSi/YPHB8OpJyk+R2HpVeTDRDaNflXWmY86ara1lGURXKXsaYF5KPkKuYeEAX0qENTjIaV5L2BuNxL1DI1SMKZlqkJp7Ao7CfEvqPvr1XDQ+DNb+rV5ZB8Q9R99esRQ99F3a2ylTdmYqv6rFmGqxqdCRqzeBftFRlK4lyZDGGHiHE8NhopREUVlM6jUugMgCG41BUgHqT0r0DD9mMFhcQ+IbF2llTu3W6KrsSMzhCD4yRe21ydNa8xwf9n8xxz4OGUN3LDvcSoIVAV2tf8AxTe2UHS2/QDF2cxhxkmGiRjPAzOTtYReIOT5jKR1zAc6nztZ0Urs+heBwYWJD+iKG5M5JYlgB8btdmOW3poNKnWa++/M+deL9n+1+MjmSQu7RkvJJEoCxkyMzNY2IF2YN5E/M5P/AGhSsTlgiW9zrLnOn7oGutI4hYS7bYYPIsgHiF1JBtcDUX61nFwTHfb1N6UvayVjd44z/ER88wNqkwnaqFvijI81IcfSx+lJPV4Ghjg/yYw4JvP+vem/ojdT6Cj+BxEEusbgnpzHqCL1ZGFHz9PyqXca5LLpYvdMzEeEfzH9db1yXDv539dzWpGGXpSOGW21busb+Iq5MwmFbnr6f7VxcDmBBBuSbVp/0NfL5VmzxdUZlCg2J1YEHQ7AinhOTdojk6dR5YN71l8PTSlUmIkSRi4DjNrYKSPOlXdqx+UcTwz8M9QPCl6Uk4cqmTT7ING8SlqF8QxIGnVSN65DpPNO0TAyX5FqrYziIhAtYvuAdgOp/LnUnHHCakAkHwjq3L2rNzTFfG3idtVv/wB5/Ae9bRVMjBOW74DPCuEYjGzW8TO1gbnKFB2zN9hdCQo1NjpvXo2B4JgeHq8mIaN8ieHP4UeU5rLEguX2tfUm97W3BcC4o2EwSRookxjqzZb6Qo7Es8xGvePoAoscqqPCLmqEIbvTLKTI7byMR8NrWVbWjWwAsLC1VjFye408igqD/GO1uJlwyw4VGje4LyyKqq19SEiYM2W9rFlG21U+BcX4gl2M8TyN4S8qyOUFzpGgkVE88qi9hfarWCbOup8uVSwxBWI66j7j+Hzrrj00Tjl1M9wIIOMJm7riAJv9pbXuAd8rHnasZxXh2MiZmnjZs12aRTnvc+IkrqNTubV6nHu3qPuFKE3u3Xb90bfPU+9M+nh4MuqmuTzrstNLiJo4Idc5AOU8h8bNe4tlvf8AoUa7VGMqIMLpAjnMwOks2xLW2G4S+hudTcVd43NHAJRhFRMTKlppQVyrGfhWwuRI5H7JsCTewrD8NxsySMmS5sc8eW6soF28I0tb5Vxyi4vY7otTVsjZbE3vcffRfFwtLw/vu5jVcLLGBKihWcTZo5VkI+Jge5a55E1DjIlYB0N1Oi9QQCSjm+4GobmN9Rre4WI8hidYzHiSImkdfFEXV1jZGv4SspjJ8ga2qxVjp/RnSPKmXrTDgyvgMHiEFmbvY5tPtxyG23PKSPRRUGE7OGVmAv4UaQnyUbAW1JJFG4+SbxSAGakTVj9DIopDwhUwryuCXkcJDtYBdZGN/wCFR/FTbLwLokAj60tKvx8JZiANzoBcXJ20G5NFYezSpOonOWFZUjmkzjwF9SouNWGxtfLvrpc9xIPakV+yHZ5sdLJFHIFeOJpADe7sCAqgja5Op3HLqNviuNtiAseGjWBza6jxfowivEHk5GUZCsUWy2LnW1qy9nP+F4p3jYNJdv0WMMfCrghpZzfUKGyhftEDbU0L7U8WXDoMLhyTK/inl+2XfU6j7Z58lFgLcoynqZeMNKCj9qIsDEcNg1DSAnPI2qqx3Lkayyk8v9qsf2W8bEmJnjmctPKEkzk2Zu60Meg0SzAhP3tK8+xXCsSYI5UjyxSSd1Gb6scpY5BuVsDd9L+lqM9kOCyiRXwwDNG4L4hie7UqbskdtZG3BOwvSj0R8W4UmGxE+HeQJGspy3QsAhUtHa5sbxlOR8SqeVdftDw+xSOLYfEULlib8r6cvnWo7Q4ODHOmLMZMpTulUqcqz4eRs0bqCwYN8N9LKjN+rVjANC6DKAoNjtYC9jyrONvcLltsjynEcZY65cg8haoRxXN8QRx5jX2YbV6th7JHYkZQbajQW8PttQmePBtIrhQkiHMHTwsCPh8S+evtSOaTqikMTlGzKYbCyPF36JKsYPxsrGMEaaTAeHXTUmjfC+0skZyTgsOumcDqCNJB6a1o4u0pQjvFjnA07zucswBsDmMWTP6rYgfZc1FxPs4mLQS4KB7GxKJ4oG0N2hlYK0UgtYqVAvpYG9zSkjfLG/RfgxCuoZCGU7EVJesFw/HSYV76sjEggixJX4gV+xKuunOx9tSnGomAIJIIvoD+Vc08clwdePKp/wCQrevMsW/94/7x+/zrcnjMX7XyNee4rFpnff4j99W6dSVkeq3SJM9dqr+lr50q6aZy0z3njPF0W/iHzH41kMRxQyMLG9qEYviTyNv9Bf7qtoO6heUj4VY+4Gn1radJO7M5xzErLOxP+HECD55bZ/ctZaH8LUuzYl1DEMFjU7NIfgH7qgXPkvnVfGEiILzkbX0T/wDtj8q1/Z3h3iC20hQC/wDzZQHckb3CZFrJPJKvZpNY4WWOAYbKpzMSzNmZiNWY7m/P0q9icOQNNj9D/P76uYbCKvPfkQPyrmLJW3ME2sfPofz+ld8YJRo86U7lZDwokXGvXX5H8KuysdD0P0Oh/A+1RQyddxr5lTpc+nP0B51bZbgg89KpHgSXNlaRmuV1u1h7WNz8gfe1Z/tfxhkC4aHWWSy2HIHYeV+fQet6t8V42uHR5W1YAIov8TKXDHyGZSP4aH9ieGO7Njp9ZJL93+yh3a3Inl0HrU5S1PSisIqK1y/X2yyOCdxgzEp8Xxu22Zz8R/AeQrGxYSZpFKXWRSTG3MG1+fI7WPWvS8cveRt+rbT9o9f3enX0tfFSS93KT0bnUM6V0vR09NN1b9gXhOPKuVfQE5XH6pB0IHIq2vtWg4HipI5WjRwkhzBWYAqs2TfKQQUYHNtQDjWGZpe9Rc2dSz5ASFyDxMei2sSTpvVoStaKUfEPCf3ovGh/03HtXG0didcG07IYbvVxeBnliaUyLi0kicPEe9FnsY7AAHkALZzWi4dwNsIJzIUDd0QoDA3DXOa24F1C3I3NZ1O0eHTGYKXOpYxnDSKPiSKVQ0B1sDldGPpIKscV4vYyWkDhzckc7W66gXUH+WlCS3seEnVeDMy8HGbS3tW7fs5HjOHQJGyJJC+uY3BJViRdb/F3mceTa2rIJjLi9wDfa/8AtWg4BxtoY2AJv3bOzPYwxKDczPbxmwsBGPjNhfXTJPyGcr3RJwnhSYfERwd9GcVKSqZdRCgRmZze15MoOUW89qDz8MdpCcTEUjjZ48NhSxBdgSGkkbcpfxNJu5Nh5WsNxtZOHzZYjERMr4KZj/eyTLq0kh2JXdiPCFkyDUC7oMSzkySyGSRrZnIte2wAGiqOQGlLKSgjQjLJLcH4u2Dw5a+ZrKoLXJZtlFydhqbdAaEdh+A/puLUS5jFfNK4B1DElULfZMhBF+gNtbUu2eLDyJED4VGY+rfkoJ960Np+H4TCqiHvJ2TFNp9pf8OMnYMS+HS1/wD9ZPM1sa2v2bNL5V4RNisHLicU0DHJDhyY3ykDQm+RSuitJozW+BMiC1ajDxCJVjUWjACpbZRyU/gfbfehwnC9xEsbm7al5L6PIxJdieRJN9eoANFo9Vty2NOQsCcQwioZSoRC6vKWU5JmdIgpCONSTH3i23vLm+yarMq941iCDZgcyk5iiNIHCaK+Zw1r7SLbyNY6KVY2CMytY924NiGtoCeeugJ32Ou4DEA537lDLJnQMsUi92iqGzEAoC+UMybjVRvlrfYfFEcE8efuHbKZc4HqXJHvr1rCcTiaORo7vZSRck2IHte1aHiyOZy8Z+G1vPMF25UQ7R8OMuHjlA1UBW0F9dF9adONitTrYwTTdN/U/S9EuBcdlwzeB5VjcgyrFIUZrC2ZTsHHyOx0taZeBt0F/X6WvrT34Kdhcnplv8yNvnTaoG0ZWaDtBg8HiIXxGExMmIZTacOLOVChwwIRQZUFzc3YhGGpQisQpykg6na4JAN9QRbkR8jetb2J4c8OODZwgkGWzAmKTL48klxdSQpKuD4WUaG9qF9s+BNhMQ8ZUKty8YU3AgkdsoBsL5GAG2g9ammrsdprYDKx/WP+pgfnuaQwa75fXnRHA4TvFvby9CN9tqIRcNYjQX62YflTPLAyx5K3M9+gr0pVoDwhv2fcm/3V2t3Im7cy9w7hpLbc+tEO1eHyYJ9LXZF+bj8q0OC4cAb2HyoL/aJphrf8xD8mH50upyYtJHnEiZpoU/ZU+7MWNegdnp1COSRdppSdddHKL/0oKwMRtiob9E+mn4Vvuz5HcZSt7SSgi3/Oer9L+f6Ofqvw/YUaUCs7xXFksFDZQGtpux5+SgXtfe9/crjIkCEhCNORK/QaVjOMqe9RRmN2zX0sAxzXJAGxv9K7Jujjxxs2owN1tncerFtfc6D0tpUcXEsgyzsqkKTm5HKDc7dBf7r2NoTjWRL2GUDVrnX0U2v8+fPagnaaOfEr3cOXutC7Gw8QsQGO6qB4hYam3tHNPS1pOjBj1L5bgpsL+lymeQ5cJEx3IBdUvf4iL7KG/O5rcRY4SIrCNhGRoPD4+gChr5fv9Ab5uLi08MXdzCSPIuXMjMVOWwsAt1X1209qbDxjFKQFxyuCRpMhVsp/+JzfTrpU8eRoplxJ0a2ZnYHwEDpcXPqQdPb51ieMwnM9l5i2t/batS/G5EDM8gKAZg5zgsCQABHkuWIJNgToDrQ/iEuLtdZXIZgUKvqQVV7BVbNcB1uLXF9aGWdtMOGFRcWCey07xYuByhYd5kK2+JZQYip02IfnRLttwNIhaBDkIjdSqkhgGsreRMMiX6srmguG4rif0iON8TIA0sY+NlazOnI7XU39K23EImGJhwoLmdWmzZJGMZjLBkkIZj8KWTKwNiftWGaM3vZaCpUZTG9lcQ6w92sYYRJHIbi/gZmzkW1YAj7X2ajxYnF+8idbb3U2B/eI1F+dEuL9rDE7ZYVPdk3MqFj4SbnJfwjU73a1rnpYwf8AaPC0bGTDKhXS6aAty10KDXqedBNrwFqzO8PR5WCIRpdixNkRV1d3bkqjc+g3IFaOPjEfD5RHJh+9hxeHyNEf8eQBnKSSoxtCrZ3sm4SxOqmjXY/jGEkEzCBQ7qpkFg3+ES0bKDYMA5Ghsb5bk7157hoJGleSZy88jEyO2pufs9B5200sNBq16hUtKCz495ZASFUABVRL5I0GyJzsN7nViSTyAL4fxD+hUWEwCkD77UThw4Fc2SSZ24YSiYV4xJjCrfC0yxtz8OZI2NhrouavTOJYeRJcPhS4eASy4qEjW8OUGNTy8EkrBf2VS1YDs3IE4lG7bLimY/wu7fgK3QwapjoYSukeHnVAdQAuIGUi/VMrabZulU8HNJ2w9EBbUVDHDlP93t+ob2/hOuX01HkK6YF5XHoSPuNdw0FzozfQ/eDWAXmCsLHe2qsNbHy2I5XFxWax2BRHzqq3Rxc5F1DEMmdrXd1fMQWOgdj1J0UkLSWXMN7glSSD1BVgQfSvOP7Q0lyyOGB7pr5r5cwI7sgqNDcOdbi2nnRiBk8WMjlxMwiJyqb2ZcuoLKQB0vr5XAGlqJYCfxeLKY+QOtz+sB9o8h79RXl3BOJuuIViWYvZTrcnMQDmbmLX58hrpXo+HR9/CPM3bTyHhsPQ1GcdLs6oSUo0X2wjk2VbL5MNfe9l9taY0QUkZdvIfhXVZ+bn0AAH1ufrTJIgTc3PqxP0JpHRaKae5R4zDHLDJExAzKQL20bdT7EA1n3xa4nheGkZ7ywSDCyozeIJJGwVgDyYRxeWZHO5NbCNANgB6C33V47xWPu8VKB9mZremYmq4eGiPULhm07ESX7yNugb3Hhb6gVqTD0rF9k2/wDq2HIiT71atz3YqOaPyL9PL4EVjSqXu/M0qloZfUjVxRgC9ecdoMYMT+kKrFrKQN908Vh7it72gxiwwsxNjaw0vqdBpXn3BMNlnLnZ9ffnpbzr08MbkeHmlUTI4gMWhdASbnQC5NvHy8iflW64A6lpRocxWVdPsyLY2/jV/nQHBSNg8UCo1glDp5pqQB6ozr6kVreMcLdbYyJD3GXvSU+HupCO8ykHRb5ZFG4Ukbg0cctGTcGWOvHsQcTlUK4UXNjoBtcczyrMRx95JECT8OpU7DUadT+NGeK4gBSFtYgWttY8/wCdDuAWErE7jwj36V3ypujz47Kwnx7hUs0KqjG4y3RmJD2FszEnRr+I7je1ZTExYnDYmPLG1+8VbhzIjKdwcwzKbG+vK+lq3uIxyrlXMFLG1zsL8z8ja9VoceHYLErWs12ZdSVK23/a1N9dOl6hlhBOlydOGc6t8F+5KAjQ2Byg3W+hKg9L3F/vqjPwXDyOHaNSTYgjTUag6GzddRuPOreHiKqFGw0H3/jSRCQVO34HUfiPauiMEopHPKbcm7JIY3RcucuvINYWGmnhFraDdTtXcHxYRMwbDwsrHxK0KWb+JFvpfmtMGb5UMeYhia4etkoJNHZ0lybtlniPbHh7uwHDR3pKgmPIxcoR3eikObFVtmWw8xoe4bjRw2GkkaMpKlsPDE4OZdM/iLDMdCpLEm4VdelXhHBFxEkePldUgw+IC5mPh/u45Hdz1AmEKD0frQpVOLaWGIf3gZJY1JAPdBBBluTbMqJCx9WqF2lZ01T2BmNVocQEkAxDTR3CklcrSNcl9CH56kHY1X4ZgMSiscPJC/eh4ZI01DLYq3hdAttTqNRcdah4tgcQuIZwmV4yAVP2WGwvsQdSBtbrTMJxVwQmHyxeIsyhWUZt75TI22umlqanQLRouxHDsXg5882HaRMjKQjR7MLbFxpXeI4pI5jJLBIquwtcKTmtroHI1IJ96ZgeK4ueZI0mIBPiIRbDm51B8Krc6k0U4hgI5GIkmZgp0uVXXncqoFwdPakd+R0ls0Pw3GoiQpBTpmKgbXtox5A0SWYbigkXA8MDYsz3HOYmw6aG9qKrLGigAqigAAXAAA0AHlUpR9HVDJ7MPxHENBiZJUtmjm70AjQ6q9iOhFxW04R2mjxMmBlCnvVEmHkTcgaGFi7WDXRBc73B8r5PtIVabMuodcpt+sv5qSKD9mp2jlKA2e4KX27xGDx38iRb0NVXByy5Z7bO7i/hA9W1+QH41b4dh5Co8dr9F1+bE/dQ08QWSNJF0WQA68r7g9CDcHzFaDD30sMq23I1P7qnb1Py50RCKSILu0jNuAGIJ9kyi3mdKwnGoEKTFlHiBLAfZF9CWNiTfa/Qm2lbrHTrHGzAanQa6sx21O58+QHlWB7U4gQwm58TnXzNtfbTboKMRZWZvs1gUTMwXUnUnU5RyBPz8769a1MMWmZdPLkflqD/AFag/AAGXfmNv3RR7Jl1Ueo625jztb1qM3udeFOk2JG1tcqehN/kTe/9XtUmU9fmPyppsw6g/wBexpniX9of9Q/8vv8AWpnQSXbyP0/OvHeLSZ8TMesref2iN/avV+JcRWKCSX9RSffkLciTYe9eQ8OW7gnrmJ9NSatiWzZz53wjY9ktcYT0Dn/tWt5esX2DhJeWQ9AvuxLH7hWyqeT8iuFfEdSrlKkKk/bKa4VDfxX5jl66Vl+Fse8QE9dPz8qJdtR/9QuuiqOfW52+VCcCx78MfY6ai21d+J/JHj5YNxZZ7T4IkCZRcoPEBuY+dvNT4h70S7G8aeMNhXldQyhsObB4yGzMyGMg5ke5IC+LRlGoC09H58qzmPwyR+E2WJmzI9zeFzbS417okD906jnmrmipfOJPBJx+Ev0d7UcLlhUSIp/R81iB4hCTqFzfajOhRumnKh/Zy5lLDW+34+gFbvgvauaUrhsZiVjXKBmkhWRJkI0zvmABYfbF1bTY708Z2dihlZ8CSyHUwSgxPrqO4MoHeL+z56GlxZUmtQ2XFaeke2GXIQ2t9SeZI1v6iwt6VV4VwuOFgbNfKwAzeFFJUlVW21xv5U+PiMbP3ZJRxqY5BkcEbDK2/XS+1WZb5l06j6E/hXbphJ6jiTyRWllkFL7tr5AjS3mOtNcKCDntyNx1It+PzqBm9qpcXxaRITJIq6aXOt+Vl3JotV5ArfgtjEozHJIhtp9r3F8tqz/H8WO7McU2HaVrDxTIuUNzAcjW23+18yOMTG64cG7Ekvba/QbD1Ndw3CO7HeSNre5bnfyO5N683PJTab8Ho4YaEbWOE4PAnBQvG7S5XxNpEBL2u6DOwNm8CbbRMT8dA+E8IxQmE+VldWzBls2p0a2UnSxy26G1CXRp2JtoLkk6nXUlib3c/wBc6oR48RyArGAFNgBpseppEtRVuqPTOME4nK2R4cRlylu7doZV6MQpt1GYEajU6EDuEdmB3pfFWCBT/hn4jcbiMfDa/TlWRnxbNLfxDIbC521zaAWsNTVnDYlnYA+IA9dBfXrR0uqsz5tG9xuLjRDHgolUnQsupNuralrdLnl6HMQ8MkBIPeef+7NR3gd818ptbetAvd6Xy366afOk1adkMsd7yPPf+FzknKDb1+8gEVXl4V3dy58969GxXEFUG2uh2I++sD2onLP4RpkJ68+op4Ny5FnUeAPLIXAAPiGo05rr/XrQzHJqsq6dfIj8jp8qIcEwxcljpYHfzB5Vd4jgMq57XRgM4GuU2tm9ORrOlsJFml7G8UVmjdm8BcBxfSKdtmtsFkP2uT6fbFeod5a5J058q+dcDipMJLmADKQVZW1SRG3VhzBH5716b2b7WRsFDuWw41Ja7Sw7WWa2rxA7SjW1g/NirHNZOpdbnmbKOYXqR1Nh6Cw615328OdlToCSPXbb0r0WbEK3iUgofECDcEciCNxXm/H5c7s3nYeg099b00RWhnZyDwkX2t+NG8xB/r+uvyobwQWHqD9Cv50VJrmmvkzuxS+CGZ7G49x18x5/fU4e4uNagdeY2rO8e4vMsEkmGUlFYI82mRXfQBCT45NDfLe25pYpt0Um4xVgf+0Hi6u4w6a5DeQjryXztufO3Q0AwqZUJP2tP4Rv+AqDDYYkksdN2PP+ZNafstwozy52Fo4yPQkaqv4n+ddO0UcW85Gt7M4AxYdQRZm8berbD2Fh7UUpXpXrmbs7Uq2Og0q5euVhjj9pQd8Oh/0/+FNPHYj/AOkj/wCn/wAKFkmuZjT9yRy9uPoLf8eh/wDar7EfgorJ8awbtdoTJkOvdu9zr+rfcev1ouD/AFvT7MfP7/rRWaa4A8MH4MbheL92O6mQug2BNnjve+QnkeakEHpzrW8D7TYmNCmHl7+AAXjcAsgN9Arhiv8ADnXyF65icEkgs6o3sLj0P2fahE/ZiO90Zk6eIED5m/1p+5F87CPE1wG+0PbZpkEf6LDIo0YTRI+X93Jly262HpWXjxsB0Mc0X/wzuoH8LX++iLYTE/akSawsO9UMdP2tWHzqI4eXW8Md7aFZXsPZiR7Vu4l5B25ehRwwuNZcaR+1JcH18X4VZwHC+Hr4nSRvNmuPcgAUNODn6D/WfwFNPCZm3ZB6lifqKDmnzIyxteArxLjeGRbYeBR+0dvyJ/1VmJsdna7sTvt18gdvXX8KLL2ZLG7zewX8Sfwolguz+HXdTIerH8BYUVOEfsPbkzPxTySL3UUeg5KSfMknr5k1a4b2PeQlpXEWhIGjEkcrXGX3t5XrXRmJRZVt5CwH0pd4Oh/r2od5r8UN2b5Zksb2dmUnLlkXfQkEg87Gx/h+LytrXMHwiVDrh2NiB8Q57WIO3UjbnataG/ZP9e1OWXy+tDvv0HtL2M4TA7HK6LAORaVSLje2W/8Aq286LfoK8po9ib52GmwuuXQnlzPKhckhbe300+l64FH9XpdS9DVL3/Ra4l2eMnwyx3Hh+M7tYgWAGv7I12uKqt2RkY3EkVrZR473C/FrbUA7muZPf0/Kmk+vy/nTLJ9CPDfkc/ZhokZ1yMMmc5XX4f1tSND9aAS8ZRCVdHUgDMrpY2IFrqddRy53o+P4vl/OmTQhhZgGHn/M0Li3bX9g7T9mPxEUbhu7BZFuWQ/FGNyV18Sjcjcb+dDlSSJhJE5FtmU6/wA/StTjOzCNrG+Q3vl+IH3vdfrQqXgWITVQD+6bg+oNqrqg+GJokuS72c4zM75IFlWU3JGHjMiN+sz4a1gbnVky7iir4fGFlRsMZHIsMpKO1hzimAYGspFLLC4kAkhcbOmZSPfQ28r28q0XB/7QsbEfDJFITpeRBf5gpasAsz4yXDFRLg8Sh13jG2nRvIUQjfGOkbx4MqkpVUeaRVDFzZbImZzzJ00AN7WqCHt1iQnigw5Y6NIDZnOguzZib7bEfSnYv+0fFFg1sPGUuF55bjUhS51tpe1JpXodZJJVYVHZCV5HXFThkSxkCAxYZMwzWZ7h52At4bqPEL2tY57t7xSCZIsND8EJ8AFlRFCkaAWUuxNy1gqgALpmLB+LdqZsQ3jkaQZrlV8CHa+uh1Gl7ULGGmkuBG2S9wq7e7Mbm3K5NOkK7Y3ChGbJnVF+01r2AOuUcz5n/f0PgMUfd2h1jSw0B3PXTUn61l8B2bUWMjdfCPPcFvwHzrRRt3a5UbKoUpYXAynUi3TyqeRwfFlseuK8BoYdtsrdPhO/TbepBw6T/Lb5HlvWTxvFmF7yMdQdzunwn1HI0zC8eYkf3jAhi41OjNcE+pub+tDQvsbuTvwa/wD4bJ/lt8jXaBwcXkVQqzOFGwBaw9KVDTH7Drn9FfOeZHva/wA966lzs310+Y2peHpf2tTu8G34Uhjvc9XB9/xpFehHz/q9MNdCml3COA9K6PauZa7RoxxjUbeg/r3p7Gm5axrG0reVPVR5/Kllv1+n51qNY06efvp+dcBb09LfhT8nl9aeoHO4raTWRWPWpAnn/XvUoiB21rhS3KsYb3RrpB56+tOBpZqFhGW8vrXLdD/X3VIQP6/OmEf1f+VEAjfn+f3U5ZT19t/vqMeX31IBfkD7UTCuDy+X+9NYjz+lOyHp9K4Uby+goGOd4On1/lXO9/Zp2U9R8xXO6HW3uT9P51qNZ0Pf7I+v51FLgI2+KKM+qg/9wvTxF5inBT/trRoF2UJOCYf/ACkHotvoK4nCYFNxFH7oD99EsxpZvIfdRMV40RdkUfugD8KmDKf5/wAqcQOtvlUb+v30GgpnZDYbD5UOxXELdPkK7jGtWZx8pvVMcbEnKixjMTm5XqkpKm40qHOf61robzrpSINl9ce9t6VUbUq2lG1M3pqLNSpVxHUOVra0/vfT5ClSrGGmXyFOVvIW9/wNKlWMOJXkLef8iabk63NKlS2GhwA6H5/ypwI/VHzP50qVawUNKjkbeoH31xlYUqVMgCuetdDHrXKVEA4P1F/pTg68h87/AIGlSoUaxxJHIff9964HPQfIflSpUBh4jc8vr/OuPGw3++lSrGI7iu3FKlTIA026fWlSpVjHSh6U2lSrGO5utLw+dKlWM0N0prEdPrSpURWgXxGUC+n1rK4yTxcwPb8a5SroxpEpsZHrsx/r2p/def1NKlVBErH90aVKlWsNH//Z",
        category: "Sports",
        description: "Ea deserunt consectetur eu excepteur magna irure ut laboris magna culpa.",
        price: 95,
        position: {
            lat: 37.37652138447502,
            lng: -5.958577205758502
        }
    },
    {
        name: "Scooter",
        owner: idMaria,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPt8EMbmabjbgczZs5zz89kWa7coVx4jQk--jxqPrjhuhTpOE3",
        category: "Motor",
        description: "Dolor aliqua velit aliquip qui ipsum laborum occaecat ea elit.",
        price: 116,
        position: {
            lat: 41.3918424684922 ,
            lng: 2.1796165646107966
        }
    },
    {
        name: "Tabla Surf",
        owner: idNoe,
        imageUrl: "data:image/jpeg;base64,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",
        category: "Sports",
        description: "Tempor incididunt esse ea commodo.",
        price: 265,
        position: {
            lat: 41.39870363975131 ,
            lng: 2.1438277776843506
        }
    },
    {
        name: "Monitor",
        owner: idMaria,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIOq9aCca-XkIPkDXeCZGqdJZHoUCe1g-Ac1vMlR3NasjKyIxI9w",
        category: "Other",
        description: "Dolor non quis adipisicing ut mollit id in mollit cillum ipsum irure irure proident aliqua.",
        price: 102,
        position: {
            lat: 39.45650701092683 ,
            lng: -0.4005064693216127
        }
    },
    {
        name: "Clean Code",
        owner: idVane,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEhcwghOZJFUJvnN2njxBxqnMoYWe7KQrA_nHmMAfrHSDzLydq",
        category: "Books",
        description: "Irure culpa eiusmod magna aute.",
        price: 15,
        position: {
            lat: 39.47559029639345 ,
            lng: -0.3256621089700502
        }
    },
    {
        name: "Caravana",
        owner: idChema,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKXHgnbl7NJIlPDSGxKPUX6HjeUHW_fmYb8w2Ua3NBdbDqzn9B",
        category: "Motor",
        description: "Et nulla ea ex ut labore amet nostrud velit elit labore aute.",
        price: 579,
        position: {
            lat: 37.879282657144216,
            lng: -4.788118703030136
        }
    },
    {
        name: "Algorithms",
        owner: idNoe,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7NUIyzgFamKqA0e1RkDTIfQXCeFjkJB5GcMv2jgxx9y_Y5jMT",
        category: "Books",
        description: "Dolore cupidatat amet ullamco officia veniam voluptate sunt anim quis elit anim dolor.",
        price: 13,
        position: {
            lat: 38.917458380803886 ,
            lng: -6.343280868697207
        }
    },
    {
        name: "Sewing Machine",
        owner: idMaria,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirdUJV9svbz58TeQFhHuyB-PVsl21ggjL6EbIZUB22KUYSwlhgA",
        category: "Home",
        description: "Aute veniam veniam officia in aliquip Lorem id ea.",
        price: 100,
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
        position: {
            lat: 338.870268442674174 ,
            lng: -6.969417287435249
        }
    },
    {
        name: "Paddle Shovel",
        owner: idVane,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOSwjrCbmOxFx0vExzYvMsIv95kNZdw8K9Q4nQxYkdir7fbZku",
        category: "Sports",
        description: "Culpa ex Lorem sunt eu.",
        price: 102,
        position: {
            lat: 43.26347597478862 ,
            lng: -2.93988930501132
        }
    },
    {
        name: "Barbecue",
        owner: idMaria,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR88tYidAM0DwWfsia5zjOEBRhSNnwy61Iv53hs_YBzQawHDFTf",
        category: "Other",
        description: "Pariatur eu dolor adipisicing id amet duis Lorem amet enim.",
        price: 205,
        position: {
            lat:42.34269934935243 ,
            lng: -3.697099408269196
        }
    },
    {
        name: "Photo Camera",
        owner: idVane,
        imageUrl: "https://cdn.wallapop.com/images/10420/6d/61/__/c10420p384914514/i942611478.jpg?pictureSize=W640",
        category: "Other",
        description: "Pariatur eu dolor adipisicing id amet duis Lorem amet enim.",
        price: 105,
        position: {
            lat: 40.34364654259477 ,
            lng: -3.751615249675069
        }
    },
    // {
    //     name: "Zapatillas",
    //     owner: idNoe,
    //     imageUrl: "https://picsum.photos/id/228/300/300",
    //     category: "Home",
    //     description: "Dolore Lorem dolore amet incididunt dolore incididunt aliqua.",
    //     price: 117,
    //     position: {
    //         lat: 22.844909,
    //         lng: 28.627814
    //     }
    // },
    // {
    //     name: "Broca",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/20/300/300",
    //     category: "Fashion",
    //     description: "Mollit nulla enim magna eu sit do sit incididunt nulla culpa.",
    //     price: 255,
    //     position: {
    //         lat: 80.017098,
    //         lng: -10.90237
    //     }
    // },
    // {
    //     name: "Máquina de coser",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/167/300/300",
    //     category: "Books",
    //     description: "Veniam culpa irure eu nostrud ipsum do aliqua nisi reprehenderit aliquip amet.",
    //     price: 257,
    //     position: {
    //         lat: 19.767716,
    //         lng: -153.884669
    //     }
    // },
    // {
    //     name: "Coche",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/43/300/300",
    //     category: "Fashion",
    //     description: "Ipsum aliquip fugiat cillum anim ea laborum Lorem sint in elit sint magna.",
    //     price: 21,
    //     position: {
    //         lat: -4.204999,
    //         lng: 160.74953
    //     }
    // },
    // {
    //     name: "Moto",
    //     owner: idChema,
    //     imageUrl: "https://picsum.photos/id/305/300/300",
    //     category: "Motor",
    //     description: "Ullamco incididunt elit do occaecat.",
    //     price: 172,
    //     position: {
    //         lat: 61.447325,
    //         lng: 51.888083
    //     }
    // },
    // {
    //     name: "Mac",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/163/300/300",
    //     category: "Books",
    //     description: "Quis esse reprehenderit mollit cillum occaecat et deserunt laborum laboris.",
    //     price: 23,
    //     position: {
    //         lat: 24.644763,
    //         lng: -101.881389
    //     }
    // },
    // {
    //     name: "Vestino",
    //     owner: idNoe,
    //     imageUrl: "https://picsum.photos/id/394/300/300",
    //     category: "Books",
    //     description: "Anim nostrud occaecat deserunt exercitation enim pariatur aliqua.",
    //     price: 92,
    //     position: {
    //         lat: 47.587571,
    //         lng: -39.769956
    //     }
    // },
    // {
    //     name: "Broca",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/270/300/300",
    //     category: "Tools",
    //     description: "Excepteur commodo duis veniam aute dolore deserunt laboris ea ullamco quis ea.",
    //     price: 78,
    //     position: {
    //         lat: 84.909415,
    //         lng: 103.881484
    //     }
    // },
    // {
    //     name: "Tabla de Snow",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/4/300/300",
    //     category: "Home",
    //     description: "Fugiat cupidatat fugiat laborum enim voluptate.",
    //     price: 268,
    //     position: {
    //         lat: 80.136916,
    //         lng: 82.75094
    //     }
    // },
    // {
    //     name: "Caravana",
    //     owner: idChema,
    //     imageUrl: "https://picsum.photos/id/301/300/300",
    //     category: "Fashion",
    //     description: "Mollit dolore pariatur aliqua voluptate quis ipsum do elit minim qui Lorem.",
    //     price: 173,
    //     position: {
    //         lat: -5.625378,
    //         lng: 19.938488
    //     }
    // },
    // {
    //     name: "Tabla de snow",
    //     owner: idVane,
    //     imageUrl: "https://picsum.photos/id/393/300/300",
    //     category: "Sports",
    //     description: "Duis irure irure laborum culpa.",
    //     price: 293,
    //     position: {
    //         lat: -18.965821,
    //         lng: 146.758438
    //     }
    // },
    // {
    //     name: "Bici",
    //     owner: idChema,
    //     imageUrl: "https://picsum.photos/id/53/300/300",
    //     category: "Other",
    //     description: "Magna quis sint excepteur nulla id nulla id minim et laboris occaecat fugiat dolore magna.",
    //     price: 199,
    //     position: {
    //         lat: 59.268833,
    //         lng: -115.066066
    //     }
    // },
    // {
    //     name: "Moto",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/136/300/300",
    //     category: "Books",
    //     description: "Commodo exercitation dolor cillum sit esse consequat.",
    //     price: 291,
    //     position: {
    //         lat: 34.768583,
    //         lng: 114.808399
    //     }
    // },
    // {
    //     name: "Zapatillas",
    //     owner: idNoe,
    //     imageUrl: "https://picsum.photos/id/94/300/300",
    //     category: "Home",
    //     description: "Cillum sit fugiat cupidatat est consectetur tempor eiusmod Lorem incididunt eiusmod.",
    //     price: 233,
    //     position: {
    //         lat: -4.527893,
    //         lng: -169.611581
    //     }
    // },
    // {
    //     name: "Monitor",
    //     owner: idNoe,
    //     imageUrl: "https://picsum.photos/id/54/300/300",
    //     category: "Other",
    //     description: "Fugiat veniam tempor do duis consectetur aliquip amet culpa quis anim aute ex sit dolor.",
    //     price: 131,
    //     position: {
    //         lat: 79.682805,
    //         lng: -57.25084
    //     }
    // },
    // {
    //     name: "Barbacoa",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/44/300/300",
    //     category: "Books",
    //     description: "Ad eiusmod mollit dolor qui commodo tempor esse nisi cupidatat elit.",
    //     price: 249,
    //     position: {
    //         lat: -23.352174,
    //         lng: 125.922433
    //     }
    // },
    // {
    //     name: "Vestino",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/34/300/300",
    //     category: "Fashion",
    //     description: "Nostrud fugiat aliqua exercitation labore in nostrud qui culpa enim ea laborum anim.",
    //     price: 164,
    //     position: {
    //         lat: -16.348773,
    //         lng: 4.925797
    //     }
    // },
    // {
    //     name: "Barbacoa",
    //     owner: idVane,
    //     imageUrl: "https://picsum.photos/id/99/300/300",
    //     category: "Books",
    //     description: "Veniam consectetur nisi ullamco sint sint sit sit nulla consequat Lorem ad tempor dolore.",
    //     price: 255,
    //     position: {
    //         lat: -27.793935,
    //         lng: 87.961615
    //     }
    // },
    // {
    //     name: "Broca",
    //     owner: idNoe,
    //     imageUrl: "https://picsum.photos/id/279/300/300",
    //     category: "Tools",
    //     description: "Esse magna eu amet qui amet occaecat proident non.",
    //     price: 92,
    //     position: {
    //         lat: -13.02885,
    //         lng: 161.156339
    //     }
    // },
    // {
    //     name: "Tabla de Snow",
    //     owner: idVane,
    //     imageUrl: "https://picsum.photos/id/231/300/300",
    //     category: "Home",
    //     description: "Ut proident aliquip aliquip do aliqua amet et anim ullamco.",
    //     price: 126,
    //     position: {
    //         lat: 89.485112,
    //         lng: 126.672375
    //     }
    // },
    // {
    //     name: "Coche",
    //     owner: idChema,
    //     imageUrl: "https://picsum.photos/id/48/300/300",
    //     category: "Other",
    //     description: "Cillum laboris fugiat ea ut duis laboris voluptate magna in qui esse mollit.",
    //     price: 50,
    //     position: {
    //         lat: 47.522767,
    //         lng: 138.84029
    //     }
    // },
    // {
    //     name: "Bici",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/99/300/300",
    //     category: "Books",
    //     description: "Eiusmod sit anim voluptate proident non officia.",
    //     price: 54,
    //     position: {
    //         lat: -76.803258,
    //         lng: -167.178398
    //     }
    // },
    // {
    //     name: "Tabla de snow",
    //     owner: idNoe,
    //     imageUrl: "https://picsum.photos/id/32/300/300",
    //     category: "Tools",
    //     description: "Dolore incididunt aute nisi duis dolor exercitation ullamco non laboris nostrud.",
    //     price: 216,
    //     position: {
    //         lat: 18.193693,
    //         lng: -70.498178
    //     }
    // },
    // {
    //     name: "Moto",
    //     owner: idVane,
    //     imageUrl: "https://picsum.photos/id/11/300/300",
    //     category: "Books",
    //     description: "Excepteur sunt commodo non nisi excepteur id ut proident amet officia qui commodo enim eu.",
    //     price: 148,
    //     position: {
    //         lat: 76.412466,
    //         lng: -18.018999
    //     }
    // },
    // {
    //     name: "Coche",
    //     owner: idVane,
    //     imageUrl: "https://picsum.photos/id/2/300/300",
    //     category: "Fashion",
    //     description: "Minim incididunt dolor proident occaecat culpa.",
    //     price: 27,
    //     position: {
    //         lat: -37.904067,
    //         lng: -172.935608
    //     }
    // },
    // {
    //     name: "Broca",
    //     owner: idChema,
    //     imageUrl: "https://picsum.photos/id/251/300/300",
    //     category: "Fashion",
    //     description: "Sit pariatur dolore minim minim officia ut.",
    //     price: 285,
    //     position: {
    //         lat: -67.629689,
    //         lng: 124.934129
    //     }
    // },
    // {
    //     name: "Máquina de coser",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/5/300/300",
    //     category: "Sports",
    //     description: "Adipisicing cillum irure sit sint sint.",
    //     price: 161,
    //     position: {
    //         lat: 23.166561,
    //         lng: -8.767719
    //     }
    // },
    // {
    //     name: "Monitor",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/77/300/300",
    //     category: "Tools",
    //     description: "Laboris ea tempor cillum dolor consequat minim id nisi nulla adipisicing.",
    //     price: 238,
    //     position: {
    //         lat: 48.548906,
    //         lng: 38.740307
    //     }
    // },
    // {
    //     name: "Vestino",
    //     owner: idChema,
    //     imageUrl: "https://picsum.photos/id/232/300/300",
    //     category: "Other",
    //     description: "Nisi exercitation pariatur ea est reprehenderit adipisicing proident ea qui.",
    //     price: 218,
    //     position: {
    //         lat: 87.811846,
    //         lng: -66.523115
    //     }
    // },
    // {
    //     name: "Metrónomo",
    //     owner: idChema,
    //     imageUrl: "https://picsum.photos/id/102/300/300",
    //     category: "Books",
    //     description: "Officia consectetur anim sit nostrud ex minim commodo fugiat exercitation adipisicing.",
    //     price: 145,
    //     position: {
    //         lat: -31.524,
    //         lng: 122.414301
    //     }
    // },
    // {
    //     name: "Coche",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/334/300/300",
    //     category: "Home",
    //     description: "Ea cupidatat nostrud nisi dolore qui non et ut sint veniam Lorem commodo duis labore.",
    //     price: 118,
    //     position: {
    //         lat: 31.223518,
    //         lng: -169.432873
    //     }
    // },
    // {
    //     name: "Barbacoa",
    //     owner: idVane,
    //     imageUrl: "https://picsum.photos/id/340/300/300",
    //     category: "Fashion",
    //     description: "Consectetur qui cillum sint sunt aliqua exercitation.",
    //     price: 24,
    //     position: {
    //         lat: 16.568539,
    //         lng: 66.426654
    //     }
    // },
    // {
    //     name: "Broca",
    //     owner: idVane,
    //     imageUrl: "https://picsum.photos/id/294/300/300",
    //     category: "Motor",
    //     description: "Dolore pariatur deserunt velit ea magna eu deserunt exercitation.",
    //     price: 77,
    //     position: {
    //         lat: -23.580328,
    //         lng: -74.159641
    //     }
    // },
    // {
    //     name: "Broca",
    //     owner: idVane,
    //     imageUrl: "https://picsum.photos/id/205/300/300",
    //     category: "Other",
    //     description: "Cillum sint officia irure nostrud eu est laboris id proident deserunt reprehenderit commodo sint voluptate.",
    //     price: 154,
    //     position: {
    //         lat: 21.027576,
    //         lng: -95.956571
    //     }
    // },
    // {
    //     name: "Bici",
    //     owner: idMaria,
    //     imageUrl: "https://picsum.photos/id/24/300/300",
    //     category: "Motor",
    //     description: "Sit ad aute nulla sit sunt duis dolor anim irure id consectetur.",
    //     price: 21,
    //     position: {
    //         lat: -8.732278,
    //         lng: -15.725898
    //     }
    // },
    // {
    //     name: "Moto",
    //     owner: idNoe,
    //     imageUrl: "https://picsum.photos/id/197/300/300",
    //     category: "Tools",
    //     description: "Aute pariatur ex occaecat incididunt pariatur ea aliquip aute sit.",
    //     price: 189,
    //     position: {
    //         lat: -39.02833,
    //         lng: 122.38319
    //     }
    // },
    // {
    //     name: "Tabla de Snow",
    //     owner: idVane,
    //     imageUrl: "https://picsum.photos/id/36/300/300",
    //     category: "Fashion",
    //     description: "Sunt et adipisicing nisi dolore nulla qui enim nulla proident.",
    //     price: 196,
    //     position: {
    //         lat: -57.606506,
    //         lng: -33.803906
    //     }
    // },
    // {
    //     name: "Caravana",
    //     owner: idVane,
    //     imageUrl: "https://picsum.photos/id/387/300/300",
    //     category: "Motor",
    //     description: "Quis ipsum anim officia eu culpa dolor sunt.",
    //     price: 244,
    //     position: {
    //         lat: -65.112706,
    //         lng: 150.743066
    //     }
    // },
    // {
    //     name: "Tabla de snow",
    //     owner: idNoe,
    //     imageUrl: "https://picsum.photos/id/201/300/300",
    //     category: "Books",
    //     description: "Cillum cupidatat tempor adipisicing consectetur non elit pariatur et enim ut aliquip pariatur occaecat culpa.",
    //     price: 184,
    //     position: {
    //         lat: 83.723488,
    //         lng: -103.260485
    //     }
    // },
    // {
    //     name: "TV",
    //     owner: idChema,
    //     imageUrl: "https://picsum.photos/id/173/300/300",
    //     category: "Home",
    //     description: "Minim fugiat excepteur elit aliqua consequat qui.",
    //     price: 133,
    //     position: {
    //         lat: -25.273063,
    //         lng: 15.153266
    //     }
    // },
    // {
    //     name: "Coche",
    //     owner: idNoe,
    //     imageUrl: "https://picsum.photos/id/32/300/300",
    //     category: "Other",
    //     description: "Officia qui cupidatat minim et et esse minim anim.",
    //     price: 105,
    //     position: {
    //         lat: 31.920067,
    //         lng: 178.764687
    //     }
    // }
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
})