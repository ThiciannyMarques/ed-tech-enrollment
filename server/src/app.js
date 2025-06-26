const express = require('express');
const configMiddlewares = require('./config/middlewares');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

configMiddlewares(app);
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
