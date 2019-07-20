import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false
    };
  }

  deleteOnClick = e => {
    this.props.delete(this.props.id);
  };

  render() {
    // These are so the Modal data resets every time it is closed and it doesnt load the same conetent for different posts

    const modalId = 'myModal' + this.props.id;
    const targetModal = '#myModal' + this.props.id;

    return (
      <div className='card text-center mt-4 mb-4'>
        <div className='card-header'>{this.props.title}</div>
        <div className='card-body'>
          <h5 className='card-title author-name'>{this.props.author}</h5>
          <div
            className='modal fade'
            id={modalId}
            tabIndex='-1'
            role='dialog'
            aria-labelledby='exampleModalCenterTitle'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-dialog-centered' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5
                    className='modal-title mx-auto mt-4'
                    id='exampleModalCenterTitle'
                  >
                    Post Title: {this.props.title}
                  </h5>
                  <button
                    type='button'
                    className='close '
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  Are you sure you want to delete this post? <br />
                  This cannot be undone
                </div>
                <div className='modal-footer '>
                  <button type='button' data-dismiss='modal'>
                    Cancel
                  </button>
                  <button
                    type='button'
                    data-dismiss='modal'
                    onClick={this.deleteOnClick}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className='card-text'>{this.props.body}</p>
          <button type='button' data-toggle='modal' data-target={targetModal}>
            Delete Post
          </button>
        </div>
        <div className='card-footer text-muted'>{this.props.date}</div>
      </div>
    );
  }
}

export default Card;
