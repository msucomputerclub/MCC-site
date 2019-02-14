const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //isemail
  if (!Validator.isEmail(data.email)) {
    errors.email = "email needs to be valid";
  }
  //empty validators
  if (isEmpty(data.email)) {
    errors.email = "email cannot be empty";
  }
  if (isEmpty(data.password)) {
    errors.password = "password cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
