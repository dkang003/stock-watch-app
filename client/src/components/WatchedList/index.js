import React, { Component } from 'react';


{/* <li key={key} onClick={() => handleClick(stock)}>{stock}</li> */}
export default ({ stock, handleClick }) => (
    <div>
        <button className="btn btn-success" onClick={() => handleClick(stock)}>{stock}</button>
    </div>
)