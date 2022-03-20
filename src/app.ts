import bodyParser from 'body-parser';
import express, { Express } from 'express';

import routes from './routes';

import { getConfig } from '@config';

const { PORT: port } = getConfig();

const setUpApp = (): Express => {
  const app = express();

  app.use(express.json());
  app.set('port', port);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/', routes);

  return app;
};

export default setUpApp;
