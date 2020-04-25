import React from 'react';
import '../css/detailsStyle.css'

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }


    render() {
        console.log(this.props);
        const { productDetails } = this.props;
        return (
            <div>
                <div className="card mb-3 card-style">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                        <img src={productDetails.image_url} className="card-img-top" alt=""></img>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{productDetails.title}</h5>
                                <p className="card-text">{productDetails.description}</p>
                                <p className="card-text">{productDetails.excerpt}</p>
                                <p className="card-text">Τιμή: {productDetails.price}</p>
                                <button className="btn btn-primary">Take it</button>
                                <button className="btn btn-primary">Add to Fav</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
