/* eslint-disable no-process-env */

const EMPTY = '';
export interface Config {
  NODE_ENV: string;
  PORT: number;
  ENV_PATH: string;
}

export const getConfig = (): Config => ({
  ENV_PATH: process.env.ENV_PATH || EMPTY,
  NODE_ENV: process.env.NODE_ENV || EMPTY,
  PORT: getNumericalEnv(process.env.PORT, 5555),
});

const getNumericalEnv = (
  envValue: string | undefined,
  defaultValue: number
) => {
  if (!envValue) {
    return defaultValue;
  }
  const value = Number(envValue);
  if (isNaN(value)) {
    return defaultValue;
  }
  return value;
};
