import React, { Component } from 'react';
import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from '../layout/Dashboard';
import classnames from 'classnames';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      success: false,
      token: {},
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
      email: this.state.email,
      password: this.state.password
    };
    // Calling the actual Axios request through props
    this.props.loginUser(userData);
  };

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

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

    if (this.state.success === true) {
      return <Dashboard token={this.state.token} />;
    }

    return (
      <div className='container mt-5 text-center'>
        <h1 className='register-header'>Login</h1>
        <form onSubmit={this.onSubmit}>
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
            />
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

          <button type='submit' className='btn'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
