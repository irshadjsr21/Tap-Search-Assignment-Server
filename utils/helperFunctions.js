/**
 * Some helper functions used throughout the app
 */

module.exports.createErrorBody = function(message, errors) {
  errorBody = {
    message,
    errors
  };
  return errorBody;
};

module.exports.createFieldError = function(value, msg, param) {
  const error = {
    value,
    msg,
    param
  };
  return error;
};

module.exports.createError = (status, msg, errors) => {
  const error = new Error(msg);
  error.isCustom = true;
  error.customCode = status;
  error.customBody = module.exports.createErrorBody(msg, errors);
  return error;
};
