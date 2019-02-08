import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Layout extends Component {
    render() {
        let {currentUser} = this.props;
        // debugger
        return(
            <div>
                <Navbar currentUser={ currentUser } />
                { this.props.children }
            </div>
        )
    }
}