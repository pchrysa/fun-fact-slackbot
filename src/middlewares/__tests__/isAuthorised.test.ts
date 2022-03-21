import { createHmac, timingSafeEqual } from 'crypto';

import { Request, Response } from 'express';

import { isAuthorised } from './../isAuthorised';

import { CustomError } from '@utils/customError';

jest.mock('@config', () => ({
  getConfig: jest.fn(() => ({
    SLACK_SIGNING_SECRET: 'any',
  })),
}));
jest.mock('crypto');

const mockRes = {} as Response;
const mockNext = jest.fn();
const mockCreateHmac = createHmac as jest.Mocked<any>;
const mockTimingSafeEqual = timingSafeEqual as jest.Mocked<any>;

describe('isAuthorised middleware tests', () => {
  beforeEach(() => {
    mockCreateHmac.mockImplementation(
      jest.fn().mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn(),
      })
    );
  });
  it('will throw error when no correct headers', async () => {
    const mockReq = {
      headers: {},
    } as Request;

    let thrownError;

    try {
      isAuthorised(mockReq, mockRes, mockNext);
    } catch (error) {
      thrownError = error.message;
    }

    expect(thrownError).toEqual(
      'Failed to verify authenticity: header x-slack-signature did not have the expected type (undefined)'
    );
  });

  it('will call next with error when no correct header type', async () => {
    const mockReq = {
      headers: {
        'x-slack-signature': 'any',
        'x-slack-request-timestamp': 'any',
      } as any,
    } as Request;
    isAuthorised(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new CustomError('Something went wrong', 401));
  });

  it('will call next with not authorized error', async () => {
    const mockReq = {
      headers: {
        'x-slack-signature': 'any',
        'x-slack-request-timestamp': Math.floor(new Date().getTime() / 1000),
      } as any,
    } as Request;

    isAuthorised(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new CustomError('Not Authorized', 401));
  });

  it('will call next without error', async () => {
    mockTimingSafeEqual.mockReturnValue(true);
    const mockReq = {
      headers: {
        'x-slack-signature': 'any',
        'x-slack-request-timestamp': Math.floor(new Date().getTime() / 1000),
      } as any,
    } as Request;

    isAuthorised(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalledWith(new CustomError('Not Authorized', 401));
  });
});
