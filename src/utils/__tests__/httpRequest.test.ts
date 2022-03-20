import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

import { get } from '@utils/httpRequest';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<any>;

describe('httpRequest tests', () => {
  describe('get requests', () => {
    it('verifies route works', async () => {
      const mockResponseMessage = 'Mock text';
      const mockResponse: { data: string } = { data: mockResponseMessage };

      mockAxios.mockResolvedValue(mockResponse);

      const response = await get<{ data: string }>('/test-api');

      expect(mockAxios).toHaveBeenCalledTimes(1);
      expect(response).toBe(mockResponseMessage);
    });

    it('should return error', async () => {
      mockAxios.mockImplementationOnce(() => {
        throw new Error('fail');
      });

      const getRequest = get<{ data: string }>('/test-api');

      await expect(getRequest).rejects.toThrow(new Error('fail'));
    });

    it('should return error when response status greater than 201', async () => {
      const mockResponseMessage = 'Mock text';
      const mockResponse: { data: string; status: number } = {
        data: mockResponseMessage,
        status: StatusCodes.NOT_FOUND,
      };

      mockAxios.mockResolvedValue(mockResponse);

      const getRequest = get<{ data: string }>('/test-api');

      await expect(getRequest).rejects.toThrow('Something went wrong');
    });
  });
});
