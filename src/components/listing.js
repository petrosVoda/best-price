import React from 'react';
import { Pagination } from 'react-bootstrap'
import history from './../history';

export default class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: {},
      products: []
    };
  }

  componentDidMount() {
    fetch(`http://bp-interview.herokuapp.com/categories/${this.props.location.state.categorieId}/products`)
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
    console.log(this.props);
    console.log(this.props.location.state.categorieId);
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#id</th>
              <th scope="col">Προιόν</th>
              <th scope="col">Φωτογταφία</th>
              <th scope="col">Τιμή</th>
              <th scope="col">Δες το προιον</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td><img src={product.image_url} className="card-img-top" alt=""></img></td>
                  <td>{product.price}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => history.push({ pathname: '/Details', state: { productId: product.id } })}>open</button>
                  </td>
                </tr>
              )
            }, this)}
          </tbody>
        </table>
      </div>
    );
  }
}


// eslint-disable-next-line no-lone-blocks
{/* <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
          </div>
        </div> */}