import React, { Component } from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom'
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import {connect} from 'react-redux'

const asyncLogin = asyncComponent(() => import('./containers/Login/Login'));
const asyncTimetable = asyncComponent(() => import('./containers/Timeline/Timeline'));

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          this.props.isAuthenticate ?
            <Route path="/" component={asyncTimetable} /> :
            <Route path="/" component={asyncLogin} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate:!!(state.auth.user)
  }
};


export default withRouter(connect(mapStateToProps)(App));
