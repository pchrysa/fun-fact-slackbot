import { REDDIT_TIL_API_URL } from './../constants';
import { RedditDataChild, RedditResponseApi } from './types';

import { get } from '@utils/httpRequest';

const getRandomArrayIndex = (arrayLength: number) => Math.floor(Math.random() * arrayLength);

export const getDailyFact = async (): Promise<RedditDataChild['data']> => {
  const response = await get<RedditResponseApi>(REDDIT_TIL_API_URL);
  if (!response?.data?.children.length) {
    throw new Error('NOT_FOUND');
  }

  const children = response?.data?.children ?? [];
  const dailyFunFact = children[getRandomArrayIndex(children.length)].data;

  return {
    title: dailyFunFact.title,
    thumbnail: dailyFunFact.thumbnail,
    url_overridden_by_dest: dailyFunFact.url_overridden_by_dest,
  };
};
