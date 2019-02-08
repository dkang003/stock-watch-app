import React, { Component } from 'react';
import httpClient from '../../utilities/httpClient';

class Login extends Component {
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
        // let {email, password} = this.state;
        let user = await httpClient.authenticate(this.state, "/api/users/authenticate");
        if (user) {
            this.props.onLoginSuccess();
            this.props.history.push("/profile");
            console.log("YAY")
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
                        <label>Email address</label>
                        <input 
                            type="text" 
                            name="email"
                            className="form-control" 
                            placeholder="Enter email"
                            value={email}
                            onChange={this.handleChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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
                    <button type="submit" className="btn btn-primary">Log Me In</button>
                </form>
            </div>
        )
    }
}

export default Login;