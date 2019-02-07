import React from 'react';
import { Link } from 'react-router-dom';

export default({ currentUser }) => {
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Stock Watch</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <Link className="nav-link nav-item" to="#">REACT</Link>
                    <a class="nav-item nav-link" href="#">Search Stocks</a>
                    <a class="nav-item nav-link" href="#">Edit Profile</a>
                </div>
            </div>
        </nav>
    )
}