import React, { Component } from 'react';
import axios from 'axios';


{/* <li key={key} onClick={() => handleClick(stock)}>{stock}</li> */}
export default ({ key, stock, handleClick }) => (
    <div>
        <button key={key} onClick={() => handleClick(stock)}>{stock}</button>
    </div>
)