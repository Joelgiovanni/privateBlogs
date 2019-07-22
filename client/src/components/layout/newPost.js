import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './NewPost.css';

class newPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const postData = {
      title: this.state.title,
      author: this.props.auth.user.name,
      body: this.state.body
    };

    axios
      .post('/auth/newPost', postData)
      .then(res => {
        this.props.history.push('/dashboard');
      })
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className='container text-center'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group mb-4'>
            <label className='form-heading'>Title:</label>
            <input
              type='title'
              name='title'
              value={this.state.title}
              onChange={this.onChange}
              className='form-control text-center'
              placeholder='Title'
            />
          </div>

          <div className='form-group mt-5'>
            <label className='form-heading'>Content:</label>
            <textarea
              className='form-control'
              rows='4'
              name='body'
              value={this.state.body}
              onChange={this.onChange}
            />
          </div>
          <button type='submit' className='btn'>
            Post
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { newPost }
)(newPost);
