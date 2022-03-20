import './config/runtimeconfig/envParser';
import setUpApp from './app';

import { getConfig } from '@config';

const { PORT: port } = getConfig();
const app = setUpApp();

try {
  app.listen({ port }, () => {
    console.info(`🚀 Server ready at http://0.0.0.0:${port}`);
  });
} catch (error) {
  console.error(error);
}

process.on('uncaughtException', err => {
  console.error('Caught exception:', err);
});
