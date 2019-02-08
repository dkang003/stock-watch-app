import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WatchedList from '../WatchedList';
import Stories from '../Stories';
import Graph from '../Graph';


export default class Profile extends Component {

// need 3 components
// 1. users collection of watched stocks
// 2. a graph component to show stock price data
// 3. story component to render related news
    render() {
        // debugger
        let { currentUser } = this.props;
        return(
            <div className="row">
                {/* <h1>Profile</h1> */}
                <div className="col-4">
                    <WatchedList currentUser={currentUser} />
                </div>
                <div className="col-8">
                    <Graph />
                    <Stories />
                </div>
            </div>
        )
    }
}