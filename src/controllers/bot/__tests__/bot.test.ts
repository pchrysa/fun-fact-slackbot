import BotController from '../botController';

import * as redditService from '@services/reddit/facts/getDailyFact';

describe('Bot controller tests', () => {
  it('getDailyFunFact should return correct valid response', async () => {
    const getRedditServiceSpy = jest.spyOn(redditService, 'getDailyFact').mockResolvedValue({
      title: 'fact title',
      thumbnail: 'image',
      url_overridden_by_dest: 'url',
    });

    const controller = new BotController();
    const result = await controller.getDailyFunFact();

    expect(getRedditServiceSpy).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual({
      blocks: [
        {
          text: {
            text: 'Fun fact. Learn something new everyday!',
            type: 'mrkdwn',
          },
          type: 'section',
        },
        {
          type: 'divider',
        },
        {
          accessory: {
            alt_text: 'Fact thumbnail',
            image_url: 'image',
            type: 'image',
          },
          text: {
            text: '*<url|fact title>*',
            type: 'mrkdwn',
          },
          type: 'section',
        },
        {
          type: 'divider',
        },
      ],
      response_type: 'in_channel',
    });
  });

  it('getDailyFunFact should return correct data on error response', async () => {
    const getRedditServiceSpy = jest.spyOn(redditService, 'getDailyFact').mockRejectedValue('Something went wrong');

    const controller = new BotController();
    const result = await controller.getDailyFunFact();

    expect(getRedditServiceSpy).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual({
      blocks: [
        {
          text: {
            text: ':crying_cat_face: Something went wrong. Please try again.',
            type: 'mrkdwn',
          },
          type: 'section',
        },
      ],
      response_type: 'in_channel',
    });
  });
});
