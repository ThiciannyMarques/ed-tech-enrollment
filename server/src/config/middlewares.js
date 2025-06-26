const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimiter = require('../middlewares/rateLimiter');

module.exports = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(rateLimiter);
};
