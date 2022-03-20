import { Block, BlockAccessoryType, BlockTextType, BlockType } from '@controllers/bot/types';
import { RedditDataChild } from '@services/reddit/facts/types';

export const transformFactToSlackResponse = (fact: RedditDataChild['data']): Block[] => {
  const factText = fact.url_overridden_by_dest ? `<${fact.url_overridden_by_dest}|${fact.title}>` : fact.title;

  return [
    {
      type: BlockType.section,
      text: {
        type: BlockTextType.mrkdwn,
        text: `*${factText}*`,
      },
      accessory: fact.thumbnail
        ? {
            type: BlockAccessoryType.image,
            image_url: fact.thumbnail,
            alt_text: 'Fact thumbnail',
          }
        : undefined,
    },
    {
      type: BlockType.divider,
    },
  ];
};
