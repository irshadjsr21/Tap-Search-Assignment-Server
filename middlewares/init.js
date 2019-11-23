const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const middlewares = [
  bodyparser.json({ extended: false }),
  cors(),
  morgan('dev')
];

module.exports = middlewares;
