import React from 'react';
import '../css/homeStyle.css'
import Listing from './listing'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            error: null,
            isLoaded: false,
            id:"",
            products: []
        };
    }

    componentDidMount() {
        fetch("http://bp-interview.herokuapp.com/categories")
          .then(res => res.json())
          .then(
            (result) => {
            console.log(result);
              this.setState({
                isLoaded: true,
                categories: result
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

      fetcProducts(id) {
          this.setState({ id: id });
          fetch(`http://bp-interview.herokuapp.com/categories/${id}/products`)
          .then(res => res.json())
          .then(
            (items) => {
            console.log(items);
            this.setState({
                products: items
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
 
    render() {
        const { categories } = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
                    <a className="navbar-brand" href="best-price">
                        Best Price Demo
                    </a>
                </nav>
                <div className="container">
                    <div className="row">
                    {categories.map(categorie => (
                            <div className="col-3 card cardStyle" key={categorie.id}>
                                <img src={categorie.image_url} className="card-img-top" alt=""></img>
                            <div className="card-body">
                              <h5 className="card-title">{categorie.title}</h5>
                              <button onClick={this.fetcProducts.bind(this, categorie.id)} className="btn btn-primary">Δες τα προιόντα</button>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
                <Listing 
                id={this.state.id}
                products={this.state.products}
                />
            </div>
        );
    }
}
