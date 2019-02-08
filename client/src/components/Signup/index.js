import React, { Component } from 'react';
import httpClient from '../../utilities/httpClient';
import axios from 'axios';

class Signup extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/users', this.state)
        .then( res => {
            let token = res.data.token;
            httpClient.setToken(token);
            this.props.history.push('/profile');
        })
    }

    render() {
        let { name, email, password } = this.state;

        return(
            <div>
                <h1>Sign Up!</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                        type="text" 
                        name="name"
                        className="form-control" 
                        placeholder="What's your name?"
                        value={name}
                        onChange={this.handleChange} />
                    </div>                
                    <div className="form-group">
                        <label>Email address</label>
                        <input 
                        type="text" 
                        name="email"
                        className="form-control" 
                        placeholder="Enter email"
                        value={email}
                        onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                        type="password" 
                        name="password"
                        className="form-control" 
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signup;