import React, { Component } from 'react';
import axios from 'axios';

export default class Button extends Component {
    // This component is a button that when clicked, will add the current stocks symbol
    // into the users watchedStocks array
    state = {
        currentUser: "",
        liked: false
    }

    componentDidMount() {
        // debugger
        this.setState({ currentUser: this.props.currentUser })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // e.currentTarget[0].id => Company's stock symbol
        let symbol = e.currentTarget[0].id;
        let { currentUser } = this.state;
        // debugger
        try {
            // first, check if the stock symbol exists in our DB
            let res = await axios.get(`api/stocks/${symbol}`)
            // if it doesn't exist, create an instance of the stock model
            // debugger
            if (res.data.stock.length === 0) {
                // since it is being created, we already know userId needs to be added to stock and vice versa
                let newStock = await axios.post(`/api/stocks/`, {symbol: symbol, user: currentUser})
                // this.setState({ liked: true })
            } else {
                let updatedStock = await axios.patch(`api/stocks/${symbol}`, {symbol: symbol, user: currentUser})
            }            
        } catch(err) {
            debugger
        }

        // if it is not, add the symbol into the currentUsers watched stocks array
        // then add the currentUsers ID into the stocks watchingUsers array

        // else, remove the current symbol from the users watched list
        // then remove the currentUsers id from the stocks watchingUsers array
    }
    
    render() {
        // debugger
        return(
            <form onSubmit={this.handleSubmit}>
                <button id={this.props.result.symbol} type="submit" className="btn btn-primary">Watch this Stock</button>
            </form>
        )
    }
}