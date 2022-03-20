/* eslint-disable no-process-env */
import { getConfig } from '@config';

describe('getConfig tests', () => {
  let env = {};
  beforeAll(() => {
    env = process.env;
    process.env = {};
  });

  afterAll(() => {
    process.env = env;
  });

  it.each(Object.keys(getConfig()))('returns the correct default value for %s', async key => {
    let expected: string | boolean | number;
    switch (key) {
      case 'PORT':
        expected = 5555;
        break;
      default:
        expected = '';
        break;
    }

    const config = getConfig();

    expect(config[key]).toBe(expected);
  });

  it.each(Object.keys(getConfig()))('returns the correct value for %s', async key => {
    const input = `MOCKED_ENV_${key}`;
    process.env[key] = input;

    let expected: string | boolean | number;
    switch (key) {
      case 'PORT':
        expected = 5555;
        break;
      default:
        expected = input;
        break;
    }

    const config = getConfig();

    expect(config[key]).toBe(expected);
  });

  describe('getNumericalEnv tests', () => {
    it.each([['PORT', 123]])('if envValue is corrent number', async (key: string, expected: number) => {
      process.env[key] = '123';

      const config = getConfig();

      expect(config[key]).toBe(expected);
    });

    it.each([['PORT', 5555]])('if envValue is incorrent number', async (key: string, expected: number) => {
      process.env[key] = '123a';

      const config = getConfig();

      expect(config[key]).toBe(expected);
    });
  });
});
