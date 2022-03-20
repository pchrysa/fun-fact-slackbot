import { botDailyFunFactHandler } from '../botHandlers';

jest.mock(
  '../botController',
  () =>
    function () {
      return {
        async getDailyFunFact() {
          return 'getDailyFunFactResult';
        },
      };
    }
);

describe('botHandlers', () => {
  const mockRequest = {} as any;
  const mockResponse = {
    send: jest.fn(),
  } as any;

  const mockNext = jest.fn();

  it('botDailyFunFactHandler', async () => {
    await botDailyFunFactHandler(mockRequest, mockResponse, mockNext);
    expect(mockResponse.send).toBeCalledWith('getDailyFunFactResult');
  });
});
