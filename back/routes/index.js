const express = require('express');
require('dotenv');
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
ObjectId = require('mongodb').ObjectID;

// const uploadCloud = require('../cloudinary.js');

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
  let promise = null;

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
      .populate("owner")
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
      .populate("owner")
      .then(productsOwner => res.json(productsOwner))
      .catch(e => console.log(e))
});

//actual write to cloudinary via the middleware specified in ../config/cloudinary.js
// router.post('/addProduct', uploadCloud.single('photo'), (req, res, next) => {
router.post('/addProduct', (req, res, next) => {
  // const imgName = req.file.originalname;
  // const newPhoto = new Photo({imgName})
  // console.log(req.file.url);

  const owner = ObjectId(req.body.owner);
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  const description = req.body.description;

  const newProduct = new Product({
    name,
    owner,
    category,
    description,
    price
  });

  console.log("Trying to store product", newProduct);

  newProduct
      .save()
      .then(()=>{ res.status(200).json(newProduct) })
      .catch(err => res.status(500).json({ message: 'Could not save Product' + err }) );

  // //actual write in mongo using mongoose
  // newPhoto.save()
  // .then(photo => {
  //   res.json({url: req.file, photo: photo});
  // }).catch(error => {console.log(error);
  // })
});

module.exports = router;
