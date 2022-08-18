const express = require('express');
const cors = require('cors');

const globalErrorHandler = require('./middlewares/globalErrorHandler');
const loggerMiddleware = require('./middlewares/logger');
const apiRoutes = require('./routes');

const port = process.env.PORT || 4000;

const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

if (!jwtPrivateKey) {
  console.log('FATAL ERROR: JWT_PRIVATE_KEY not defined in env');
  process.exit(1);
}

const startApp = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('AoK!');
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(loggerMiddleware);

  app.use('/api', apiRoutes);

  app.use(globalErrorHandler);

  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
};

module.exports = startApp;
