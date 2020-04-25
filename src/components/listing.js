import React from 'react';
import { Pagination } from 'react-bootstrap'
import Details from './details'

export default class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: {}
    };
  }

  fetcProductDetails(id) {
    this.setState({ id: id });
    fetch(`http://bp-interview.herokuapp.com/products/${id}`)
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

  render() {
    console.log(this.props);
    const { products } = this.props
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
          {!products ?
            <tbody>
              <tr>
                <td colSpan="8">
                  <div>
                    <h1>Παρακαλώ επιλέξτε μία κατηγορία</h1>
                  </div>
                </td>
              </tr>
            </tbody>
            :
            <tbody>
              {products.map(product => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td><img src={product.image_url} className="card-img-top" alt=""></img></td>
                    <td>{product.price}</td>
                    <td>
                      <button onClick={this.fetcProductDetails.bind(this, product.id)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        open
                      </button>
                    </td>
                  </tr>
                )
              }, this)}
            </tbody>
          }
        </table>
        <Details productDetails={this.state.productDetails}/>
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