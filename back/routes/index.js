const express = require('express');
require('dotenv');
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
ObjectId = require('mongodb').ObjectID;
const uploadCloud = require('../cloudinary');


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

router.post('/productDetail', (req, res, next) => {
  Product
    .findById(req.body.id)
    .populate("owner")
    .then(product => res.json(product))
    .catch(e => console.log(e))
});

router.get('/products/:category', (req, res, next) => {
  Product
    .find({ category: req.body.category })
    .then(productsCategory => res.json(productsCategory))
    .catch(e => console.log(e))
});

router.get('/products/:city', (req, res, next) => {
  Product
    .find({ location: req.params.city })
    .then(productsCity => res.json(productsCity))
    .catch(e => console.log(e))
});

router.post('/myproducts', (req, res, next) => {
  Product
    .find({ owner: req.body.id })
    .populate("owner")
    .then(productsOwner => res.json(productsOwner))
    .catch(e => console.log(e))
});

//actual write to cloudinary via the middleware specified in ../config/cloudinary.js
router.post('/upload', uploadCloud.single("imageUrl"), (req, res, next) => {
  console.log('file is: ', req.file)
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get secure_url from the file object and save it in the 
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
})

router.post('/updateProduct', (req,res,next)=>{
  console.log(req.body)
  Product
  .findByIdAndUpdate(req.body.id ,{
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    position: req.body.position
  })
  .then(() => { res.status(200).json(myProductEdit) })
  .catch(err => res.status(500).json({ message: 'Could not save Product' + err }));
})

router.post('/addProduct', (req, res, next) => {
  console.log("addProduct", req.body)

  const name = req.body.name;
  const imageUrl = req.body.imageUrl
  const owner = req.body.owner;
  const category = req.body.category;
  const description = req.body.description;
  const price = req.body.price;
  const position= req.body.position


  const newProduct = new Product({
    name,
    imageUrl,
    owner,
    category,
    description,
    price,
    position
  });

  console.log("Trying to store product", newProduct);

  newProduct
    .save()
    .then(() => { res.status(200).json(newProduct) })
    .catch(err => res.status(500).json({ message: 'Could not save Product' + err }));
});

router.post('/deleteProduct', (req, res, next) => {
  console.log("deleteProduct", req.body)
  
  Product
    .findByIdAndDelete(req.body.id)
    .then(Products => res.json(Products))
    .catch(e => console.log(e))
});

router.post('/updateUser', (req,res,next)=>{
  console.log("updateUser", req.body)

  User
  .findByIdAndUpdate(req.body.id ,{
    username: req.body.username,
    city: req.body.city,
    email: req.body.email,
  })
  .then(() => { res.status(200).json(userUpdate) })
  .catch(err => res.status(500).json({ message: 'Could not save dates User' + err }));
})



module.exports = router;
