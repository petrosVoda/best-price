import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./components/home";
import Listing from './components/listing';
import Details from './components/details'

import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Details" component={Details} />
                    <Route path="/Listing" component={Listing} />
                </Switch>
            </Router>
        )
    }
}