const express = require('express');
const router  = express.Router();
const Product = require("../models/Product");

/* GET home page */
router.get('/index', (req, res, next) => {
  res.render('index');
});



router.get('/products', (req, res, next) => {
  let promise = null

  if  (req.query.category == null) {
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

module.exports = router;
