import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Search extends Component {
    state = {
        companies: [],
        searchResult:null,
        searchString: ""
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {searchString, companies} = this.state;

        let searched = companies.filter(obj => {
            if (obj.name.toLowerCase().indexOf(searchString.toLowerCase()) === 0) {
                return obj.name;
            }
        })
        this.setState({ searchResult: searched });
        debugger
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
        let { companies, searchResult } = this.state;

        // debugger
        
        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Search</label>
                    <input 
                        type="text" 
                        name="searchString"
                        className="form-control" 
                        placeholder="Search for Company"
                        onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            { searchResult ? searchResult.map((result,index) => {
                return <div className="card col-12" key={index}>
                <div className="card-body text-left">
                    <h4 className="card-title">{result.name}</h4>
                    <h4 className="card-subtitle">Symbol: {result.symbol}</h4>
                </div>
            </div>
            }) 
            :
            console.log("NULL")
            }
            </div>
        )
    }
}