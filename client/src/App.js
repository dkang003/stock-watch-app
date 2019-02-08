import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout';
import httpClient from './utilities/httpClient';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';

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
          <Route exact path="/signup" render={(props) => {
            return <Signup {...props} onSignupSuccess={this.onAuthSuccess} />
          }} />
          <Route exact path="/logout" render={() => {
            return <Logout logout={this.logout} />
          }} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
