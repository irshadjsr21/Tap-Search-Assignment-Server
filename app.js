const express = require('express');

const { PORT } = require('./config/index');
const initialMiddlewares = require('./middlewares/init');
const errorHandlers = require('./utils/errorHandlers');
const routes = require('./routes');
const app = express();

/**
 * Initializing all the middlewares required
 */
app.use(...initialMiddlewares);

/**
 * Initializing all the routes
 */
app.use(routes);

/**
 * Initializing all the error handlers
 */
app.use('*', errorHandlers.notFound);
app.use(errorHandlers.error);

/**
 * Starting the express server
 */
app.listen(PORT, () => {
  console.log('Listening on port : ' + PORT);
});
