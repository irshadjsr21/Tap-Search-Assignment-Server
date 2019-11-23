/**
 * Error handlers required by the express app
 */

const responses = require('./responses');
const { createError } = require('./helperFunctions');

module.exports.notFound = (req, res, next) => {
  throw createError(404, 'Page not found');
};

module.exports.error = (error, req, res, next) => {
  if (error.isCustom) {
    responses.any(res, error.customCode, error.customBody);
  } else {
    responses.error(res, { error: 'Internal Server Error' });
    console.error(error);
  }
};
