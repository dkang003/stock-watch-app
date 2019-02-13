import React, { Component } from 'react';
import axios from 'axios';


{/* <li key={key} onClick={() => handleClick(stock)}>{stock}</li> */}
export default ({ stock, handleClick }) => (
    <div>
        <button onClick={() => handleClick(stock)}>{stock}</button>
    </div>
)