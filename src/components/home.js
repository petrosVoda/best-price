import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            error: null,
            isLoaded: false,
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
                categories: result.categories
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
                    <a className="navbar-brand">
                        <img width="30" height="30" alt="">
                        </img>
                        Best Price
                    </a>
                </nav>
                <div>
                    <ul>
                        {categories.map(categorie => (
                            <li key={categorie.id}>
                                {categorie.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
