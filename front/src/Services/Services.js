import axios from 'axios';

export default class AuthServices {  
  constructor(){
    this.service = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  signup = (username, password,city,email) => {
    return this.service.post('/auth/signup', {username, password,city,email})
    .then(response => response.data)
  };

  login = (username, password,city,email)=>{
    return this.service.post('/auth/login', {username, password,city,email})
    .then(response => response.data)

  };

  loggedin = ()=>{
    return this.service.get('/auth/userData')
  .then(response => response.data)
  };

  logout = ()=>{
    return this.service.get('/auth/logout')
  .then(response => response.data)
  };

  addProduct = (owner, pictures, name, category, price, description) => {
    return this.service.post('/addProduct', {owner,pictures,name,category,price,description})
    .then(response => response.data)
  };

  deleteProduct = (id) => {
    return this.service.post('/deleteProduct', {id})
    .then(response => response.data)
  }
  getProducts= () =>{
    return this.service.get('/products')
    .then(allProducts => allProducts)
  }

  getPcategory= (category )=>{
    return this.service.get('/category',{category})
    .then(productCat => productCat)
  }
}