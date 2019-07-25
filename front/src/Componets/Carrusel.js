import React, { Component } from 'react'

export default class Carrusel extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            product: {
                pictures: []
            }
        }
    }
    render() {
        return (
            <div>
                
            <div className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">

                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner">

                    {
                        this.state.product.pictures.map((picture, idx) => {
                            return (
                                <div key={idx}>
                                    <div className="carousel-item active">
                                        <img src={picture.imgName} className="d-block w-100" alt="" />
                                    </div>
                                </div>
                            )
                        })

                    }
                    <div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
         </div>
        )
    }
}
