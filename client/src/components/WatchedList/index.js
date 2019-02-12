import React, { Component } from 'react';
import axios from 'axios';

// export default class WatchedList extends Component {
    
//     render() {
//         let { stocks, handleClick } = this.props
//         debugger
//         { if (stocks === undefined) {
//             return <div>loading</div>
//         } else {
//             return(
//                 <h1>WTF</h1>
//             )
//         }}
//     }
// }

export default ({ key, stock, handleClick }) => (
    <li key={key} onClick={() => handleClick(stock)}>{stock}</li>
    // <ul>
        // {stocks.map(stock => {
            // return <li onClick={() => handleClick(stock)}>{stock}</li>
        // })}
    // </ul>
)