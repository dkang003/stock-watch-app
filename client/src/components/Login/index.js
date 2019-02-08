import React, { Component } from 'react';
import httpClient from '../../utilities/httpClient';

export default class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let user = await httpClient.authenticate(this.state, "/api/users/authenticate");
        if (user) {
            this.props.onLoginSuccess();
            this.props.history.push("/profile");
        } else {
            console.log("Not An Authenticated User")
        }
    }

    render() {
        let { email, password } = this.state;
        
        return(
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                            type="text" 
                            name="email"
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            value={email}
                            onChange={this.handleChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                        type="password" 
                        name="password"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Log Me In</button>
                </form>
            </div>
        )
    }
}