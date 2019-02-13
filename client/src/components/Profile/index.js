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
            // res.data.payload.watchedStocks //array
            this.setState({ watchingStocks: res.data.payload.watchedStocks })
        }
        // debugger
        this.getSymbols();
    }

    // how can I push res.data.stock.symbols into the temp array before loading
    getSymbols() {
        let {watchingStocks, symbols} = this.state;
        let temp = [];
        if (watchingStocks !== undefined) {
            watchingStocks.map(async(id) => {
                let res = await axios.get(`api/stocks/${id}`)
                // debugger
                temp.push(res.data.stock.symbol)
            })
        }
        this.setState({ symbols: temp })
        // debugger
    }

    render() {
        let { currentUser } = this.props;
        let { watchingStocks, symbols } = this.state; //array of ID's
        // debugger

        return(
            <div className="row">
                <div className="col-3">
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
                
                    <Search currentUser={currentUser} />    
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