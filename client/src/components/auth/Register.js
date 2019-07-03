import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      success: false,
      errors: {}
    };
  }

  // Redirect to dashboard if the user is logged in || Will not allow a logged in user to have access to this component
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // This is the call that fires off the Register action
    this.props.registerUser(userData, this.props.history);
  };

  // Will check for errors in the props that will be recieved. Will set the errors to the errors object in state and render them on the UI
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='container mt-5 text-center'>
        <h1 className='register-header'>Register</h1>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label className='form-label'>Name</label>
            <input
              type='text'
              className={classnames('form-control text-center', {
                'is-invalid text-center': errors.name
              })}
              placeholder='Enter Name'
              name='name'
              onChange={this.onChange}
              value={this.state.name}
            />
            {errors.name && (
              <div className='invalid-feedback'> {errors.name} </div>
            )}
          </div>
          <div className='form-group'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className={classnames('form-control text-center', {
                'is-invalid text-center': errors.email
              })}
              placeholder='Enter Email'
              name='email'
              onChange={this.onChange}
              value={this.state.email}
            />{' '}
            {errors.email && (
              <div className='invalid-feedback'> {errors.email} </div>
            )}
          </div>
          <div className='form-group'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className={classnames('form-control text-center', {
                'is-invalid text-center': errors.password
              })}
              placeholder='Enter Password'
              name='password'
              onChange={this.onChange}
              value={this.state.password}
            />
            {errors.password && (
              <div className='invalid-feedback'> {errors.password} </div>
            )}
          </div>
          <div className='form-group'>
            <label className='form-label'>Confirm Password</label>
            <input
              type='password'
              className={classnames('form-control text-center', {
                'is-invalid text-center': errors.password2
              })}
              placeholder='Confirm Password'
              name='password2'
              onChange={this.onChange}
              value={this.state.password2}
            />
            {errors.password2 && (
              <div className='invalid-feedback'> {errors.password2} </div>
            )}
          </div>

          <button type='submit' className='btn'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

// Setting up Redux in Component
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// WithRouter will pass updated match, location, and history props to the wrapped component whenever it renders.

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
