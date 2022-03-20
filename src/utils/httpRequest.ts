import axios, { Method } from 'axios';
import { StatusCodes } from 'http-status-codes';

const fetchPromise = async <Res, Req>(
  endpoint: string,
  method: Method = 'GET',
  body: Req,
  customHeaders?: Record<string, string>
): Promise<Res> => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(customHeaders ?? {}),
  };

  const response = await axios(endpoint, {
    method,
    headers,
    data: body,
  });

  if (response.status > StatusCodes.CREATED) {
    throw Error('Something went wrong');
  }
  return response.data;
};

export const get = async <Res, Req = undefined>(
  endpoint: string,
  customHeaders?: Record<string, string>
): Promise<Res> => {
  return fetchPromise(endpoint, 'GET', customHeaders);
};
