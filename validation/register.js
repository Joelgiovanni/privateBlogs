const isEmpty = require('is-empty');
const Validator = require('validator');

module.exports = function registerValidation(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'You must enter a name to register';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'You must enter a valid email to register';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'You must enter a password';
  }

  if (data.password.length < 6) {
    errors.password = 'Password must be atleast 6 characters long';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'You must confirm the password';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
