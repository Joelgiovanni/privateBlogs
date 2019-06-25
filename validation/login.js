const isEmpty = require('is-empty');
const Validator = require('validator');

module.exports = function registerLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'You must enter a valid email to login';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'You must enter a password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
