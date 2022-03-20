import path from 'path';

import * as dotenv from 'dotenv-defaults';

import { getConfig } from '@config';

const envPath = getConfig().ENV_PATH;

const dotenvArgs = envPath.length
  ? { path: path.resolve(process.cwd(), `./.env.${envPath}`) }
  : {};
dotenv.config(dotenvArgs);
