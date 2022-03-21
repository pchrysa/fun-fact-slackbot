import { Request, Response } from 'express';

import { errorHandler } from './../errorHandler';

import { CustomError } from '@utils/customError';

describe('Verify that error handler', () => {
  const mockNext = jest.fn();
  const req = {} as Request;
  const res = createResponse() as Response;

  it('handles error successfully with custom error message and status code', () => {
    errorHandler(new CustomError('Custom Error', 504), req as Request, res, mockNext);

    expect(res.send).toHaveBeenCalledWith({ message: 'Custom Error', status: 504, additionalInfo: {} });
  });

  it('handles error successfully with custom error message and empty status code', () => {
    const err: Error = new Error('A Very Bad Error!');
    const res = createResponse(false) as Response;

    errorHandler(err as any, req as Request, res, mockNext);

    expect(res.send).toHaveBeenCalledWith({
      message: 'Oh no, this is embarrasing. We are having troubles my friend',
      status: 500,
      additionalInfo: {},
    });
  });
});

function createResponse(headersSent: boolean = true): Partial<Response> {
  return {
    headersSent,
    json: jest.fn(),
    status: jest.fn(),
    send: jest.fn(),
  };
}
