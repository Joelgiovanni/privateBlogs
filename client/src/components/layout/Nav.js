import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

import './Nav.css';

class Nav extends Component {
  // Action to log out a user || Destroy token || set isAuthenticated === false
  logout = e => {
    this.props.logoutUser();
    this.props.history.push('/');
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const notLoggedIn = (
      <ul>
        <li className='link'>
          <Link to='/login'>Login</Link>
        </li>
        <li className='link'>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
    );

    const loggedIn = (
      <ul>
        <li className='link'>
          <Link onClick={this.logout} to='/register'>
            Logout
          </Link>
        </li>
      </ul>
    );

    return (
      <header id='header'>
        <h1 className='nav-header'>
          <Link to='/'>Private Blogging</Link>
        </h1>
        <nav className='links text-right mr-5'>
          {isAuthenticated ? loggedIn : notLoggedIn}
        </nav>
      </header>
    );
  }
}

Nav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Nav));
