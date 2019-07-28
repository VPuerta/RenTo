import React, { Component } from 'react';
import AuthServices from '../../Services/Services'

export default class FilterProducts extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            products:[],
            filterCategory: props.filterCategory

        }
        this.service = new AuthServices();
    }

    getProductsByCategory = (category) => {
        console.log(category)
        this.service.getPcategory(category)
            .then(productCat => {
                this.setState({
                    products: this.props.filterCategory(category)
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({filterCategory: value})
    };

    componentDidMount() {
        this.getProductsByCategory();
    }

    render() {
        return (
            <div>
                <div >
                    <select name="category" form="category" value={this.state.category} onChange={ e => this.handleChange(e) }>
                        <option value="">All Categories</option>
                        <option value="Sport">Sport</option>
                        <option value="Other">Other</option>
                    </select>
                </div>  
            </div>
        )
    }
}
