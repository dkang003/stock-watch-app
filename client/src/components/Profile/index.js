import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WatchedList from '../WatchedList';
import Stories from '../Stories';
import Graph from '../Graph';
import Search from '../Search';


export default class Profile extends Component {


    render() {
        // debugger
        let { currentUser } = this.props;
        return(
            <div className="row">
                {/* <h1>Profile</h1> */}
                <div className="col-3">
                    <WatchedList currentUser={currentUser} />
                    <Search />
                </div>
                <div className="col-9">
                    <Graph />
    {/* Show top stories by default, show related stories if company is selected */}
                    <Stories />
                </div>
            </div>
        )
    }
}