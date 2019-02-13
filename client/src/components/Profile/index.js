import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WatchedList from '../WatchedList';
import Stories from '../Stories';
import Graph from '../Graph';
import Search from '../Search';



export default class Profile extends Component {
    state = {
        results: [],
        symbols: [],
        companyInfo: null
    }

    handleClick = (stock) => { 
        this.setState({ stock })
        axios.get(`/api/data/company/${stock}`)
        .then(res => {
            this.setState({ companyInfo: res.data })
        }).catch(err => {
            debugger
        })
        
    }

    async componentDidMount() {
        if (this.props.currentUser !== null) {
            let { _id } = this.props.currentUser;
            let res = await axios.get(`/api/users/${_id}`)
            // get the current users array of watched stocks and set it to state
            this.setState({ watchingStocks: res.data.payload.watchedStocks })
        }
        // debugger
        this.getSymbols();
    }

    // how can I push res.data.stock.symbols into the temp array before loading
    getSymbols() {
        let {watchingStocks} = this.state;
        let temp = [];
        if (watchingStocks !== undefined) { // if users array of watched stocks is in state
            // have an array of the mongo ID for the stocks
            watchingStocks.map(async(id) => {
                // for each id, ping the api 
                let res = await axios.get(`api/stocks/${id}`)
                // debugger
                // and store its symbol into the temp array
                temp.push(res.data.stock.symbol)
            })
        }
        this.setState({ symbols: temp })
        // debugger
    }

    render() {
        let { currentUser } = this.props;
        let { symbols } = this.state; //array of ID's
        // debugger

        return(
            <div className="row">
                <div className="col-3 container text-center">
                    { (symbols.length > 0)
                    ? (symbols.map((symbol, i) => {
                        return <WatchedList 
                        key={i}
                        stock={symbol} 
                        handleClick={this.handleClick}/>
                    }))
                    :
                    (<h1></h1>)
                    }
                
                    <Search currentUser={currentUser} handleClick={this.handleClick} />    
                </div>
                <div className="col-9">
                    <Graph stock={this.state.stock} company={this.state.companyInfo} />
    {/* Show top stories by default, show related stories if company is selected */}
                    <Stories stock={this.state.stock} />
                </div>
            </div>
        )
    }
}