import React, { Component } from 'react';
import './MyProducts.css'
import UploadProduct from '../UploadProduct/UploadProduct';
import AuthServices from '../../Services/Services';


export default class MyProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myProducts: [],
            editingIndexes: []
        }
        this.service = new AuthServices();
    }

    componentDidMount() {
        let id = this.props._id
        this.service.getMyProducts(id)
            .then(getMyProdcuts => {
                console.log(getMyProdcuts)
                this.setState({
                    ...this.state,
                    myProducts: getMyProdcuts
                })
            })
            .catch(error => {
                console.log(error);
            });
    }


    uploadProductDidAddProduct = (product) => {
        console.log("Product added", product);
        const myProducts = this.state.myProducts;
        myProducts.push(product);
        this.setState({
            ...this.state,
            myProducts: myProducts
        });
    };

    getImageName = (product) => {
        // let imgName;
        // if (product.pictures.length !== 0) {
        //     imgName = product.pictures[0].imageUrl
        // } else {
        //     imgName = placeholder2
        // }
        return product.imageUrl;
    };

    deleteProductClicked = (product, idx) => {
        this.clearEditingIndexes(idx);
        this.service.deleteProduct(product._id)
            .then(response => {
                let productSpreadOperator = [...this.state.myProducts];
                productSpreadOperator.splice(idx, 1)
                this.setState({
                    ...this.state,
                    myProducts: productSpreadOperator
                });
            }).catch((err) => { console.log(err) })
    };

    editButtonClicked = (product, idx) => {
        let index = this.state.editingIndexes.indexOf(idx);
        if (index > -1) {
            this.state.editingIndexes.splice(index, 1);
            this.updateProduct(product);
        } else {
            this.state.editingIndexes.push(idx)
        }

        this.setState({
            ...this.state,
            editingIndexes: this.state.editingIndexes
        })
    }

    clearEditingIndexes  = (idx) => { 
        let index = this.state.editingIndexes.indexOf(idx);
        if (index > -1) {
            this.state.editingIndexes.splice(index, 1);
        }
    }

    handleChange = (event, idx) => {
        const {name, value} = event.target;

        this.state.myProducts[idx][name] = value;

        this.setState({
            ...this.state,
            myProducts: this.state.myProducts
        })
    };

    updateProduct = (product) => {
        this.service.updateProduct(
            product._id, 
            product.imageUrl, 
            product.name, 
            product.category, 
            product.price, 
            product.description, 
            product.position
        )
        .then((response) => { console.log("Updated!", response) })
        .catch((err) => { console.log(err) })

    }

    render() {
        return (
            <div className="container3">
             

                <div className="tittle">
                    <h3>Your Products {this.props.username}</h3>
                </div>
                {
                    this.state.myProducts.map((myProduct, idx) => {
                        return (
                            <div className="drop3 cont" key={idx} >
                                <div className="">
                                    <img className="image" src={this.getImageName(myProduct)} alt={myProduct.name} />
                                </div>
                                <div className="">
                                { this.state.editingIndexes.includes(idx) ?
                                    (<input className="card-title" type="test" name="name" value={myProduct.name} onChange={e => this.handleChange(e, idx) } /> ) :
                                    (<h5 className="card-title">{myProduct.name}</h5>)
                                }
                                 </div>

                                <div className="card-body">
                                { this.state.editingIndexes.includes(idx) ?
                                    ( <select name="category" form="category" value={myProduct.category} onChange={e => this.handleChange(e, idx) }>
                                    <option value="Sport">Sport</option>
                                    <option value="Other">Other</option>
                                    </select>) 
                                    :
                                    (<p className="card-text">{myProduct.category}</p>)
                                }
                                </div>
                                <div className="card-body">
                                { this.state.editingIndexes.includes(idx) ?
                                    (<input type="text" placeholder="Price € " name="price" value={myProduct.price} onChange={e => this.handleChange(e, idx) } /> ) :
                                    (<p className="card-text">{myProduct.price} €</p>)
                                }
                                </div>

                                <div className="card-body">
                                { this.state.editingIndexes.includes(idx) ?
                                    (<div><h6>Description: </h6><textarea type="text" placeholder="How is it?" name="description" value={myProduct.description} onChange={e => this.handleChange(e, idx) } /> </div>) :
                                    (<div><h6>Description: </h6><p className="card-text">{myProduct.description} </p></div>)
                                }
                                </div>
                                <div className="btn-edit">

                                { this.state.editingIndexes.includes(idx) ?
                                    (<button id ="button" className="btn btn-warning" onClick={e => this.editButtonClicked(myProduct, idx)} producs={this.myproducts} >Save</button>) :
                                    (<button  id ="button"className="btn btn-warning" onClick={e => this.editButtonClicked(myProduct, idx)} producs={this.myproducts} >Edit</button>)
                                }
                                    <button id ="button" className="btn btn-warning" onClick={() => this.deleteProductClicked(myProduct, idx)}>Delete</button>
                                </div>
                                


                            </div>
                        )
                    })
                }


                <div >
                    <UploadProduct {...this.props} uploadProductDidAddProduct={p => this.uploadProductDidAddProduct(p)} />
                </div>
            </div>
        )
    }

} 
