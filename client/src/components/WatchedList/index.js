import React, { Component } from 'react';


export default class WatchedList extends Component {
    
    render() {
        let { currentUser } = this.props;
        // array of watched stocks === currentUser.watchedStocks 

        return(
            <h2>User is watching this list</h2>
        )
    }
}