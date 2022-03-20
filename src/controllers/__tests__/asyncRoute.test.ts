import { Request, Response } from 'express';

import { asyncRoute } from '../asyncRoute';

describe('asyncRoute tests', () => {
  const req = {} as Request;
  const res = {} as Response;
  it('resolves promise successfully', async () => {
    const mockNext = jest.fn();

    const resp = asyncRoute(() => 'OK')(req, res, mockNext);

    await expect(resp).resolves.toEqual('OK');
  });

  it('handles promise rejection successfully', async () => {
    const mockNext = jest.fn();
    mockNext.mockImplementation(() => 'FAIL');

    const resp = asyncRoute(async () => {
      throw new Error('Error occurred');
    })(req, res, mockNext);

    await expect(resp).resolves.toEqual('FAIL');
  });
});
