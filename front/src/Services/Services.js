import axios from 'axios';

export default class AuthServices {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    })
  }

  signup = (username, password, city, email,photo) => {
    return this.service.post('/auth/signup', { username, password, city, email,photo })
        .then(response => response.data)
  };

  login = (username, password) => {
    return this.service.post('/auth/login', { username, password })
        .then(response => response.data)

  };

  loggedin = () => {
    return this.service.get('/auth/userData')
        .then(response => {
          return response.data
        })
  };

  logout = () => {
    return this.service.get('/auth/logout')
        .then(response => response.data)
  };

  addProduct = (owner, imageUrl, name, category, price, description, position) => {
    return this.service.post('/addProduct', { owner, imageUrl, name, category, price, description, position })
        .then(response => response.data)
  };

  deleteProduct = (id) => {
    return this.service.post('/deleteProduct', { id })
        .then(response => response.data)
  };

  getProducts = () => {
    return this.service.get('/products')
        .then(allProducts => allProducts)
  };

  getMyProducts = (id) => {
    return this.service.post('/myproducts', { id })
        .then(MyProducts => MyProducts.data)
        .catch(err => err)
  };

  getProductDetail = (id) => {
    return this.service.post('/productDetail', { id })
        .then(MyProducts => MyProducts.data)
        .catch(err => err)
  };

  getPcategory = (category) => {
    return this.service.get('/category', { category })
        .then(productCat => productCat)
  };

  handleUpload = (theFile) => {
    return this.service.post('/upload', theFile)
        .then(res => ("res" ,res.data))
        .catch(error => error);
  };

  handleUploadUser = (photo) => {
    return this.service.post('/auth/signup/upload', photo)
        .then(res => ("res" ,res.data))
        .catch(error => error);
  };

  updateProduct = (id, imageUrl, name, category, price, description, position) => {
    return this.service.post('/updateProduct', { id, imageUrl, name, category, price, description, position })
        .then(editMyProduct => editMyProduct)
  };

  updateUser = (id, username, city, email) => {
    return this.service.post('/updateUser', { id, username, city, email })
        .then(userEdit => userEdit)
  };

  getMyRents = (id) => {
    return this.service.post('/myrents', { id })
        .then(myRents => myRents.data)
        .catch(err => err)
  };

  updateRating = (id,rating) => {
    return this.service.post('/updateRating', { id, rating })
        .then(myRents => myRents.data)
        .catch(err => err)
  }

  addRent = (product, owner, client, firstDay, lastDay )=>{
    return this.service.post('/addRent', { product, owner, client, firstDay, lastDay })
    .then(response => response.data)
};

getMyRentsPending = (id) => {
  return this.service.post('/myRentsPending', { id })
      .then(myRentsPending => myRentsPending.data)
      .catch(err => err)
};

updateStatus = (id,status) => {
  return this.service.post('/updateStatus', { id, status })
      .then(rent => rent.data)
      .catch(err => err)
}

  
}

