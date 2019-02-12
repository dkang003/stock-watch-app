import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WatchedList from '../WatchedList';
import Stories from '../Stories';
import Graph from '../Graph';
import Search from '../Search';
import { symlinkSync } from 'fs';


export default class Profile extends Component {
    state = {
        stock: 1,
        results: [],
        symbols: []
    }

    handleClick = (stock) => { 
        // debugger
        this.setState({ stock })
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
                {/* <h1>Profile</h1> */}
                <div className="col-3">
                { (symbols.length > 0)
                ? (symbols.map((symbol, i) => {
                    return <WatchedList 
                        key={i}
                        stock={symbol} 
                        handleClick={this.handleClick}/>
                }))
                :
                (<h1>hi</h1>)
                }
                    <Search currentUser={currentUser} />
                </div>
                <div className="col-9">
                    {/* <Graph stock={this.state.stock}/> */}
                    <h1>{this.state.stock}</h1>
    {/* Show top stories by default, show related stories if company is selected */}
                    <Stories currentUser={currentUser} />
                </div>
            </div>
        )
    }
}