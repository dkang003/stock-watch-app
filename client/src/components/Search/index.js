import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {
    state = {
        companies: []
    }

    // component did mount
    async componentDidMount() {
        // ping api and get an array of all companies
        try {
            let res = await axios.get("https://api.iextrading.com/1.0/ref-data/symbols")
            this.setState({ companies: res })
        } catch(err) {
            console.log(err);
        }

    }
    render() {
        return(
            <h1>SEARCH PAGE!</h1>
        )
    }
}