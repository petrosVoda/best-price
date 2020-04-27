import React, { Component } from 'react';
import '../css/homeStyle.css'
import history from './../history';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            error: null
        };
    }

    componentDidMount() {
        fetch("http://bp-interview.herokuapp.com/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        categories: result
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    render() {
        const { categories } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row content">
                        {categories.map(category => (
                            <div className="col-3 card cardStyle" key={category.id}>
                                <img src={category.image_url} className="card-img-top" alt=""></img>
                                <div className="card-body card-content">
                                    <h5 className="card-title">{category.title}</h5>
                                    <button onClick={() => history.push({ pathname: '/Listing', state: { categoryId: category.id, category: category.title} })} className="btn btn-outline-secondary buttons">
                                        <i className="fas fa-ellipsis-v icon"></i>
                                        Δες τα προϊόντα
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
