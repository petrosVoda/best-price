import React, { Component } from 'react';
import history from './../history';
import ReactPaginate from 'react-paginate';
import {Circle} from 'better-react-spinkit';
import '../css/listing.css';

export default class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 15,
      currentPage: 0,
      sliceProducts: {},
      loadingProducts: false
    };
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }

  componentDidMount() {
    this.receivedData()
  }

  receivedData() {
    fetch(`http://bp-interview.herokuapp.com/categories/${this.props.location.state.categorieId}/products`)
      .then(res => res.json())
      .then(
        (items) => {
          const data = items;
          const slice = items.slice(this.state.offset, this.state.offset + this.state.perPage)
          this.setState({ pageCount: Math.ceil(data.length / this.state.perPage), loadingProducts: true, sliceProducts: slice })
        }
      )
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    });

  };

  render() {
    const { sliceProducts, loadingProducts } = this.state;
    return (
      <div className="container">
        <table className="table">
          {!loadingProducts ?
            <tbody>
              <tr>
                <td colSpan="8">
                  <div className="my-spin">
                    <Circle size={30} />
                  </div>
                </td>
              </tr>
            </tbody>
            :
            <tbody>
              {sliceProducts.map(product => {
                return (
                  <tr key={product.id} className="table">
                    <td className="tableTd">{product.title}</td>
                    <td className="tableTd"><img src={product.image_url} width="80" height="80" alt=""></img></td>
                    <td className="tableTd"> Τιμή: {product.price}€</td>
                    <td className="tableTd">
                      <button className="btn btn-primary" onClick={() => history.push({ pathname: '/Details', state: { productId: product.id } })}>open</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          }
        </table>

        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </div>
    )
  }
}
