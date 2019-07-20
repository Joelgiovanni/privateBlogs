import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import setAuthToken from './helpers/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Nav from './components/layout/Nav';
import Home from './components/layout/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/layout/Dashboard';
import NewPost from './components/layout/newPost';

// KEEPS A USER LOGGED IN ON REFRESH && this logic will check for a valid token on every route and the token must either be manually destroyed with the logout function or the token must expire
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is Authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // This will vary depending on the amount of time that you set for token exp.
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser);
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/newPost' component={NewPost} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
