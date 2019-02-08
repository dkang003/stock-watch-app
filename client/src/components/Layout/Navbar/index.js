import React from 'react';
import { Link } from 'react-router-dom';

export default({ currentUser }) => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Stock Watch</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link nav-item" to="/login">Log In</Link>
                    <a className="nav-item nav-link" href="#">Search Stocks</a>
                    <a className="nav-item nav-link" href="#">Edit Profile</a>
                </div>
            </div>
        </nav>
    )
}