import React, { Component } from 'react'

export default class UploadProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
          file: null,
          photos: [],
          username: null
        }
      }
      handleChange(e){
          let files=e.target.value
          console.warn("data file",files)
      }

    render() {
        return (
            
                <form className="add-new-product">
                        <div>
                        <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
                        <button className="btn btn-warning" type="submit">Upload photo</button>
                        </div>
                
                    <div>
                    <input type="text" placeholder="Product Name"/>
                    </div>
                    <div >
                    <select name="category" form="category">
                        <option value="Sport">Sport</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" placeholder="Price € "/>
                    </div>
                    <div >
                    <textarea type="text" placeholder="How is it?"/>
                    </div>
                    <div className="btn-edit">
                        <button className="btn btn-warning">Add</button>
                        {/* <button className="btn btn-warning">Edit</button>
                        <button className="btn btn-warning">Delete</button> */}
                    </div>
                    </form>
            
        )
    }
}
