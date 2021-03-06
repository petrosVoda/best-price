import React, { Component } from 'react';
import '../css/detailsStyle.css'
import history from './../history';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetails: {}
        };
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        fetch(`http://bp-interview.herokuapp.com/products/${this.props.location.state.productId}`)
            .then(res => res.json())
            .then(
                (item) => {
                    console.log(item);
                    this.setState({
                        productDetails: item
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {
        const { productDetails } = this.state;
        return (
            <div className="container image-container">
            <div className="row">
                <div className="col-sm-6">
                    <div className="card mb-3 card-style">
                        <div className="card-body col-md-4 image">
                            <img src={productDetails.image_url} className="card-img-top" alt=""></img>
                        </div>
                    </div>
                </div>
            </div>
                <div className="container">
                    <h5 className="card-title">{productDetails.title}</h5>
                    <p className="card-text">{productDetails.description}</p>
                    <p className="card-text">{productDetails.excerpt}</p>
                    <p className="card-text"><b>{productDetails.price}€</b></p>
                    <button className="btn btn-outline-secondary button" onClick={() => history.push({ pathname: '/Listing', state: { categoryId: productDetails.category_id} })}>
                        <i className="fas fa-arrow-left icon"></i>
                        Πίσω
                    </button>
                    <button className="btn btn-outline-secondary button button-buy">
                        Καλάθι
                        <i className="fas fa-shopping-cart icon2"></i>
                    </button>
                </div>
            </div>
        );
    }
}
