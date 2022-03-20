import {
  BlockTextType,
  BlockType,
  BotResponseType,
  BotResponseWithBlocks,
} from '../types';

export const invalidMessage: BotResponseWithBlocks = {
  response_type: BotResponseType.inChannel,
  blocks: [
    {
      type: BlockType.section,
      text: {
        type: BlockTextType.mrkdwn,
        text: ':crying_cat_face: Something went wrong. Please try again.',
      },
    },
  ],
};
