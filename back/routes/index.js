const express = require('express');
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");



/* GET home page */
router.get('/index', (req, res, next) => {
  res.render('index');
});

router.get('/users', (req, res, next) => {
  User
    .find()
    .then(allUser => res.json(allUser))
    .catch(e => console.log(e))
});

router.get('/user/:id', (req, res, next) => {
  User
    .findById(req.params.id)
    .then(user => res.json(user))
    .catch(e => console.log(e))
});




router.get('/products', (req, res, next) => {
  let promise = null

  if (req.query.category == null) {
    promise = Product.find()
  } else {
    promise = Product.find({ category: req.query.category })
  }

  promise
    .then(allProducts => res.json(allProducts))
    .catch(e => console.log(e))
});

router.get('/product/:id', (req, res, next) => {
  Product
    .findById(req.params.id)
    .then(product => res.json(product))
    .catch(e => console.log(e))
});


router.get('/products/:category', (req, res, next) => {
  Product
    .find({ category: req.params.category })
    .then(productsCategory => res.json(productsCategory))
    .catch(e => console.log(e))
});

router.get('/products/:city', (req, res, next) => {
  Product
    .find({ location: req.params.city})
    .then(productsCity => res.json(productsCity))
    .catch(e => console.log(e))
});

router.get('/user/:id/products', (req, res, next) => {
  Product
    .find({owner: req.params.id})
    .then(productsOwner => res.json(productsOwner))
    .catch(e => console.log(e))
});


//preguntar
// router.post('/user/:id/products', (req, res, next) => {
//   Product
//     .find({owner: req.params.id})
//     .then(
//       Product
//       .create({
//         name: req.body.name,
//         owner:req.params.id,
//         category:req.body.category,
//         description: req.body.description,
//         price:req.body.price,
//         picture:{
//           imgName:req.body.imgName,
//         },
//         // location:
//       }).then(newProduct => res.json(newProduct))
//     )
//     .catch(e => console.log(e))
// }

// );



module.exports = router;
