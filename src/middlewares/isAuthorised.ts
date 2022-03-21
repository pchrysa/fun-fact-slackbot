import { createHmac, timingSafeEqual } from 'crypto';

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import qs from 'qs';

import { getConfig } from '@config';
import { CustomError } from '@utils/customError';

const { SLACK_SIGNING_SECRET: slackSigningSecret } = getConfig();

const verifyErrorPrefix = 'Failed to verify authenticity';

const getHeader = (req: Request, header: string): string => {
  const value = req.headers[header];
  if (value === undefined || Array.isArray(value)) {
    throw new CustomError(
      `${verifyErrorPrefix}: header ${header} did not have the expected type (${value})`,
      StatusCodes.UNAUTHORIZED
    );
  }
  return value;
};

export const isAuthorised = (req: Request, res: Response, next: NextFunction) => {
  if (!slackSigningSecret?.length) {
    next(new CustomError('App has not been setup properly'));
    return;
  }

  const slackSignature = getHeader(req, 'x-slack-signature');
  const requestBody = qs.stringify(req.body, { format: 'RFC1738' });
  const timestamp = Number(getHeader(req, 'x-slack-request-timestamp'));
  const time = Math.floor(new Date().getTime() / 1000);

  if (Number.isNaN(timestamp) || !slackSignature || Math.abs(time - timestamp) > 300) {
    next(new CustomError('Something went wrong', StatusCodes.UNAUTHORIZED));
    return;
  }

  let sigBasestring = `v0:${timestamp}:${requestBody}`;
  let mySignature = `v0=${createHmac('sha256', slackSigningSecret).update(sigBasestring, 'utf8').digest('hex')}`;
  if (timingSafeEqual(Buffer.from(mySignature, 'utf8'), Buffer.from(slackSignature!, 'utf8'))) {
    next();
  } else {
    next(new CustomError('Not Authorized', StatusCodes.UNAUTHORIZED));
    return;
  }
};
