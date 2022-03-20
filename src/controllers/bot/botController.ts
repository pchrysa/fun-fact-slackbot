import { BlockTextType, BlockType, BotResponseSimple, BotResponseType, BotResponseWithBlocks } from './types';
import { invalidMessage } from './utils/errorMessages';
import { transformFactToSlackResponse } from './utils/transformFactToSlackResponse';

import { getDailyFact } from '@services/reddit/facts/getDailyFact';

export default class BotController {
  public async getDailyFunFact(): Promise<BotResponseWithBlocks | BotResponseSimple> {
    try {
      const dailyFunFact = await getDailyFact();

      const slackBlocks = transformFactToSlackResponse(dailyFunFact);
      return {
        response_type: BotResponseType.inChannel,
        blocks: [
          {
            type: BlockType.section,
            text: {
              type: BlockTextType.mrkdwn,
              text: 'Fun fact. Learn something new everyday!',
            },
          },
          {
            type: BlockType.divider,
          },
          ...slackBlocks,
        ],
      };
    } catch (error) {
      console.error(error);
      return invalidMessage;
    }
  }
}
