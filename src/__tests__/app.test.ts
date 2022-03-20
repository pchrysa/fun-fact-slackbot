import request from 'supertest';

import setupApp from '../app';

jest.mock('@config', () => ({
  getConfig: jest.fn(() => ({
    PORT: 5000,
  })),
}));
jest.mock('@controllers/bot/botController', () => {
  return jest.fn().mockImplementation(() => {
    return { getDailyFunFact: jest.fn().mockResolvedValue('this is a mock response') };
  });
});

describe('The App', () => {
  test('It should get response from controller (/api/daily-fun-fact)', async () => {
    const app = setupApp();
    const response = await request(app).post('/api/daily-fun-fact');

    expect(response.status).toBe(200);
    expect(response.text).toBe('this is a mock response');
  });
});
