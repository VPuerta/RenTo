import React, { Component } from 'react';
import AuthServices from '../../Services/Services';
import './UploadProduct.css'
import UploadMap from '../Map/UploadMap';

export default class UploadProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owner: this.props._id,
            // picture: [{
            //     imageUrl: ""
            // }],
            name: "",
            category: "",
            price: "",
            description: "",
            imgUrl: "",
            position:{
                lat:"",
                lng:""
            },
        };
        this.service = new AuthServices();
    }

    coordinates = (lat,lng)=>{
        const newPosition= {
            lat:lat,
            lng:lng,
        }
         this.setState({
            position: newPosition
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("imageUrl", e.target.files[0]);

        this.service.handleUpload(uploadData)
            .then(response => {
                // console.log('response is: ', response);
                // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
                this.setState({ ...this.state, imageUrl: response.secure_url });
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            });
    }

    handleSubmit = e => {
        e.preventDefault();

        const owner = this.props._id;
        const name = this.state.name;
        const category = this.state.category;
        const price = this.state.price;
        const description = this.state.description;
        const imageUrl = this.state.imageUrl;
        const position ={
            lat :this.state.position.lat,
            lng: this.state.position.lng
        }
        
        this.service.addProduct(owner, imageUrl, name, category, price, description, position)

            .then(res => {
                console.log('added: ', res);
                // here you would redirect to some other page 
                this.props.uploadProductDidAddProduct(res)
            })
            .catch(err => {
                console.log("Error while adding the thing: ", err);
            });
    }

    render() {
        return (
            <React.Fragment>
            <form className="add-new-product">
                <input type="file" value={this.state.pictures} onChange={(e) => this.handleFileUpload(e)} />
                <div className="form-contem">
                    <img src={this.state.imageUrl} alt="" style={{ height: 100 }} />
                    <div className="form">
                        <input type="text" placeholder="Product Name" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />
                    </div>
                    <div className="form">
                        <select name="category" form="category" value={this.state.category} onChange={e => this.handleChange(e)}>
                            <option value="">-----</option>
                            <option value="Sport">Sport</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form">
                        <input type="text" placeholder="Price € " name="price" value={this.state.price} onChange={e => this.handleChange(e)} />
                    </div>

                    <div className="form">
                        <textarea type="text" placeholder="How is it?" name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
                    </div>
                    <input type="text" value={this.state.position.lat}/>
                    <input type="text" value={this.state.position.lng}/>
                    <div className="btn-edit">
                        <button className="btn btn-warning" onClick={(e) => this.handleSubmit(e)}>Add</button>

                    </div>
                </div>
            </form>
           <UploadMap API_KEY = "AIzaSyAzGHDso1aXodTgAxYYmuTHdp9iVdxanhM" coordinates = {this.coordinates}></UploadMap>
            </React.Fragment>

        )
    }
}
