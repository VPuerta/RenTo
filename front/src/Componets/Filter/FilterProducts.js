import React, { Component } from 'react';
import AuthServices from '../../Services/Services'

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

    render() {
        return (
            <div>
                <div >
                    <select name="category" form="category" value={this.state.category} onChange={ e => this.handleChange(e) }>
                        <option value="All">All Categories</option>
                        <option value="Sport">Sport</option>
                        <option value="Other">Other</option>
                    </select>
                </div>  
            </div>
        )
    }
}
