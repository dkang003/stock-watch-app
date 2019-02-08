import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout';
import httpClient from './utilities/httpClient';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';

class App extends Component {
  state = {
    currentUser: httpClient.getCurrentUser()
  }


  onAuthSuccess = () => {
    this.setState({ currentUser: httpClient.getCurrentUser() });
  }

  logout = () => {
    httpClient.logout()
    this.setState({ currentUser: null });
  }

  render() {
      return (
      <Layout currentUser={this.state.currentUser}>
        <Switch>
          <Route exact path="/" component={ Landing } />
          <Route exact path="/login" render={(props) => {
            return <Login {...props} onLoginSuccess={this.onAuthSuccess} />
          }} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
