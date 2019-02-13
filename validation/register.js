const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //if empty or null, make empty
  data.email = !isEmpty(data.email) ? data.email : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.middleName = !isEmpty(data.middleName) ? data.middleName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //Length validators
  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "First Name must be between 2 and 30 characters.";
  }
  if (!isEmpty(data.middleName)) {
    if (!Validator.isLength(data.middleName, { min: 2, max: 30 })) {
      errors.middleName = "Middle Name must be between 2 and 30 characters.";
    }
  }
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Last Name must be between 2 and 30 characters.";
  }
  if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "Password must be between 5 and 30 characters.";
  }

  //Email validator
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email must be valid";
  }

  //Empty validators
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name cannot be empty";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name cannot be empty";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email cannot be empty";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty";
  }

  //password match validator
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    idValid: isEmpty(errors)
  };
};
