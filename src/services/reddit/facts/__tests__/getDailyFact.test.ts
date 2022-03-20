import axios from 'axios';

import { getDailyFact } from '@services/reddit/facts/getDailyFact';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<any>;

describe('The daily fun fact tests', () => {
  it('verifies happy path when daily fuct is requested', async () => {
    mockAxios.mockResolvedValue({
      data: {
        data: {
          children: [
            {
              data: {
                title: 'fun fact title 1',
                thumbnail: 'image1',
                url_overridden_by_dest: 'url1',
              },
            },
          ],
        },
      },
    });

    const factResponse = await getDailyFact();

    expect(factResponse).toEqual({
      title: 'fun fact title 1',
      thumbnail: 'image1',
      url_overridden_by_dest: 'url1',
    });
  });

  it('throws error when not expected response body is returned', async () => {
    mockAxios.mockResolvedValue({});
    await expect(getDailyFact()).rejects.toThrowError('NOT_FOUND');
  });
});
