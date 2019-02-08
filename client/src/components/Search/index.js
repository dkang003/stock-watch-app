import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Search extends Component {
    state = {
        companies: []
    }

    // component did mount
    async componentDidMount() {
        // ping api and get an array of all companies
        try {
            // ping api for all company symbols
            let res = await axios.get('/api/data/companies')
            this.setState({ companies: res.data })
        } catch(err) {
            console.log(err);
        }

    }
    render() {
        // debugger
        let { companies } = this.state;
        return(
            <div>
                <h1>SEARCH PAGE!</h1>
                <ul>
                { companies.map((company, i) => {
                    return <li key={i}>
                        <p>Name: {company.name},
                        Symbol: {company.symbol}</p>
                        {/* clicking this link should load 'show page' under the profile's graph */}
                        <Link  company={ company } to={ "/company" }>{company.name} </Link>
                        </li>
                })}
                </ul>
            </div>
        )
    }
}