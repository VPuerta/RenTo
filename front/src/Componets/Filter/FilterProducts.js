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
                    <select id="button" className="btn btn-warning dropdown-toggle" name="category" form="category" value={this.state.category} onChange={ e => this.handleChange(e) }>
                        <option className="dropdown-item-text" value="All">All Categories</option>
                        <option className="dropdown-item" value="Sport">Sport</option>
                        <option className="dropdown-item" value="Other">Other</option>
                    </select>
                </div>  
            </div>
        )
    }
}
