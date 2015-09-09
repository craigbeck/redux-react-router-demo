/* jshint esnext:true */
import React, { Component } from "react";
import Router, { DefaultRoute, Route } from "react-router";
import { history } from "react-router/lib/HashHistory";


const actions = {
  login: (credentials, history, nextPath) => {
    return dispatch => {
      setTimeout(() => {
        dispatch({
          type: "LOGIN_SUCCESS",
          token: "foo",
          user: { name: "craig" }
        });
        history.pushState(null, nextPath);
      }, 300);
    }
  },
  logout: () => {
    dispatch({
      type: "LOGOUT"
    });
    history.pushState(null, "/login");
  }
};

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>dashboard</h1>
        <p>{this.props.user.name}</p>
        <button onClick={actions.logout}>logout</button>
      </div>
    );
  }
}




import { connect, Provider } from "react-redux";
import { applyMiddleware, bindActionCreators, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import Immutable from "immutable";

let initialState = Immutable.Map({});

let auth = function (state = initialState, action = {}) {
  console.log("auth", state, action);
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return state.set("token", action.token).set("user", action.user);
    case "LOGOUT":
      return state.delete("token").delete("user");
    default:
      return state;
  }
};

let reducer = function (state = initialState, action = {}) {
  return state;
};

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(combineReducers({ auth }));

const dispatch = store.dispatch.bind(store);

class Login extends Component {

  login(e) {
    e.preventDefault();
    console.log("login!", e);
    let credentials = {};
    dispatch(actions.login(credentials, history, "/"));
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.login.bind(this)}>login</button>
      </div>
    );
  }
}


let DashboardView = connect(state => ({
      user: state.auth.get("user")
    }))(Dashboard);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {() =>
          <Router history={history}>
            <Route path="/" component={DashboardView} onEnter={requireAuth}/>
            <Route path="/login" component={Login}/>
          </Router>
        }
      </Provider>
    );
  }
}

function requireAuth(nextState, transition) {
  const state = store.getState();
  const isAuthenticated = Boolean(state.auth.get("token"));
  console.log("requireAuth isAuthenticated:", isAuthenticated, state);
  if (!isAuthenticated) {
    transition.to("login", null, { next: nextState.location.pathname || "/" });
  }
}

function logout(nextState, transition) {
  store.dispatch({ type: "LOGOUT" });
  transition.to("login");
}

export default App;
