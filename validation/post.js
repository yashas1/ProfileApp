const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatepostInput(data) {
  let errors = {};

  
  data.text = !isEmpty(data.text) ? data.text : '';
  
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'text must be at least 10 to 300 characters';
  }

 


  if (Validator.isEmpty(data.text)) {
    errors.text = 'text field is required';
  }
 
 
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
