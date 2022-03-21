import bodyParser from 'body-parser';
import express, { Express } from 'express';

import routes from './routes';

import { getConfig } from '@config';
import { errorHandler } from '@middlewares/errorHandler';

const { PORT: port } = getConfig();

const setUpApp = (): Express => {
  const app = express();

  app.use(express.json());
  app.set('port', port);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/', routes);

  app.use(errorHandler);

  return app;
};

export default setUpApp;
