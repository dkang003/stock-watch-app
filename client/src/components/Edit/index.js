import React, { Component } from 'react';
import axios from 'axios';
import httpClient from '../../utilities/httpClient';

export default class Edit extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        id: ""
    }

    componentDidMount() {
        let { name, email, _id } = this.props.currentUser;
        this.setState({ name, email, id: _id })
        // debugger
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { id } = this.state;
        // debugger
        axios.patch(`/api/users/${id}`, this.state)
        .then( res => {
            let token = res.data.token;
            httpClient.setToken(token);
            this.props.history.push('/profile');
        })
    }

    handleDelete = (e) => {
        e.preventDefault();
        let { id } = this.state;
        // need currentUser id then send .delete to /api/users/:id
        axios.delete(`/api/users/${id}`)
        .then( res => {
            httpClient.logout();
            this.props.history.push('/');
            // debugger
        })
        debugger
    }

    render() {
        // debugger
        return(
            <div>
                <h1>Edit Profile!</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                        type="text" 
                        name="name"
                        className="form-control" 
                        placeholder="What's your name?"
                        value={this.state.name}
                        onChange={this.handleChange} />
                    </div>                
                    <div className="form-group">
                        <label>Email address</label>
                        <input 
                        type="text" 
                        name="email"
                        className="form-control" 
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                        type="password" 
                        name="password"
                        className="form-control" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Edit My Profile</button>
                </form>
                <form onSubmit={this.handleDelete}>
                <button type="submit" className="btn btn-primary">Delete Account</button>
                </form>
            </div>
        )
    }
}