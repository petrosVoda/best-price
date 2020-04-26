import React from 'react';
import '../css/homeStyle.css'
import history from './../history';

export default class Home extends React.Component {
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
                    console.log(result);
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
                    <div className="row">
                        {categories.map(categorie => (
                            <div className="col-3 card cardStyle" key={categorie.id}>
                                <img src={categorie.image_url} className="card-img-top" alt=""></img>
                                <div className="card-body">
                                    <h5 className="card-title">{categorie.title}</h5>
                                    <button onClick={() => history.push({ pathname: '/Listing', state: { categorieId: categorie.id } })} className="btn btn-primary">Δες τα προιόντα</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
