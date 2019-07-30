import React, { Component } from 'react';


export default class EditProduct extends Component {
    render() {
        return (
            <div>
                <div>
                    <form>

                        <div className="form-group">
                            <input className="form-control" type="text" name="username" placeholder="Username" value={this.state.username} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" name="city" placeholder="City" value={this.state.city} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="email" name="email" placeholder="Email" value={this.state.email} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit" value="Signup" >Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
