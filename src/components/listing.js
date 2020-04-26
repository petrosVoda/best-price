import React, { Component } from 'react';
import history from './../history';
import ReactPaginate from 'react-paginate';
import { Circle } from 'better-react-spinkit';
import '../css/listing.css';
import '../css/homeStyle.css';


export default class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 15,
      currentPage: 0,
      sliceProducts: {},
      loadingProducts: false,
      categories: [
        {
          title: "Υγεία & Ομορφιά",
          id: "583"
        },
        {
          title: "Μόδα",
          id: "2068"
        },
        {
          title: "Παιδικά - Βρεφικά",
          id: "2175"
        },
        {
          title: "Σπίτι & Κήπος",
          id: "2185"
        },
        {
          title: "Αθλητισμός, Hobby",
          id: "3058"
        },
        {
          title: "Ψυχαγωγία",
          id: "6988"
        },
        {
          title: "Τεχνολογία",
          id: "6989"
        }
      ]
    };
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
    this.sortBy.bind(this);
  }

  componentDidMount() {
    this.receivedData()
  }

  receivedData() {
    fetch(`http://bp-interview.herokuapp.com/categories/${this.props.location.state.categoryId}/products`)
      .then(res => res.json())
      .then(
        (items) => {
          const data = items;
          const slice = items.slice(this.state.offset, this.state.offset + this.state.perPage)
          this.setState({ pageCount: Math.ceil(data.length / this.state.perPage), loadingProducts: true, sliceProducts: slice, data: items })
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

  fetchData(id) {
    fetch(`http://bp-interview.herokuapp.com/categories/${id}/products`)
      .then(res => res.json())
      .then(
        (items) => {
          const data = items;
          const slice = items.slice(this.state.offset, this.state.offset + this.state.perPage)
          this.setState({ pageCount: Math.ceil(data.length / this.state.perPage), loadingProducts: true, sliceProducts: slice })
        }
      )
  }

  sortBy(key) {
    let arrayCopy = [...this.state.sliceProducts];
    arrayCopy.sort(this.compareBy(key));
    this.setState({ sliceProducts: arrayCopy });
  }

  compareBy(key) {
    return function (a, b) {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    };
  }

  render() {
    const { sliceProducts, loadingProducts, categories } = this.state;
    console.log(this.props);

    return (
      <div>
        <div className="row">
          <div className="col-6 col-md-4 component-categories">
            <h3 className="title-text">
              <small>Κατηγορίες</small>
            </h3>
            <ul className="list-group list-categories">
              {categories.map(item => {
                return (
                  <li key={item.id} className="list-group-item category-item" onClick={this.fetchData.bind(this, item.id)}>{item.title}</li>
                )
              })}
            </ul>
          </div>
          <div className="col-md-8">
            <table>
              <thead>
                <tr>
                  <th onClick={() => this.sortBy('price')}>Ταξινομιση</th>
                </tr>
              </thead>
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
                        <td className="tableTd"><img src={product.image_url} width="80" height="80" alt=""></img></td>
                        <td className="tableTd">{product.title}</td>
                        <td className="tableTd"><b>{product.price}€</b></td>
                        <td className="tableTd">
                          <button className="btn btn-primary buttons" onClick={() => history.push({ pathname: '/Details', state: { productId: product.id } })}>Λεπτομέριες</button>
                        </td>
                        <td className="tableTd">
                          <img src="assets/supermarket.svg" alt="icon name"></img>
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
        </div>
      </div>
    )
  }
}
