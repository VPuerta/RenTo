import React, { Component } from 'react';

export default class FilterProducts extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            products: [],

        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        return (
            <div>
                <div >
                    <select name="category" form="category" value={this.state.category} onChange={ e => this.handleChange(e) }>
                        <option value="error">All Categories</option>
                        <option value="Sport">Sport</option>
                        <option value="Other">Other</option>
                    </select>
                </div>  
            </div>
        )
    }
}
