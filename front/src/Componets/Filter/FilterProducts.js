import React, { Component } from 'react';
import AuthServices from '../../Services/Services'
import './Filter.css';
import allcategories from '../Assets/allcategories.png'

export default class FilterProducts extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            filterCategory: "All"
        }
        this.service = new AuthServices();
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({filterCategory: value})
        this.props.filterProducts(value)
    };

 

    handleClick = () => {
        const { category } = this.props.match;
       this.service.getProductCategory(category)
    };

    render() {
        return (
            <div>
                    <div className="filter" >
                        <select id="button-chat" className="btn btn-warning dropdown-toggle" name="category" form="category" value={this.state.category} onChange={ e => this.handleChange(e) }>
                            <option className="dropdown-item-text" value="All">All Categories</option>
                            <option className="dropdown-item" value="Fashion">Fashion</option>
                            <option className="dropdown-item" value="Sports">Sports</option>
                            <option className="dropdown-item" value="Motor">Motor</option>
                            <option className="dropdown-item" value="Books">Books</option>
                            <option className="dropdown-item" value="Tools">Tools</option>
                            <option className="dropdown-item" value="Home">Home</option>
                            <option className="dropdown-item" value="Other">Other</option>
                        </select>
                    </div> 
                 <img src={allcategories} alt="All Categories" name="category" value="Books" onClick={ e => this.handleClick(e) }/>
            </div>
        )
    }
}
