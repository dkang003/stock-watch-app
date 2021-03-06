import React from 'react';
import { Link } from 'react-router-dom';

export default({ currentUser }) => {
    
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Stock Watch</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            { currentUser
            ? (
                <div className="navbar-nav">
                    <Link className="nav-link nav-item" to="/logout">Log Out</Link>
                    <Link className="nav-link nav-item" to="/profile">My Watched Stocks</Link>
                    <Link className="nav-link nav-item" to="/edit">Edit My Profile</Link>
                </div>
                ) : (
                <div className="navbar-nav">
                    <Link className="nav-link nav-item" to="/login">Log In</Link>
                    <Link className="nav-link nav-item" to="/signup">Sign Up</Link>
                </div>
                )
            }
            </div>
        </nav>
    )
}