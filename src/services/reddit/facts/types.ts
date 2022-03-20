export interface RedditResponseApi {
  data: {
    children: RedditDataChild[];
  };
}

export interface RedditDataChild {
  data: {
    title: string;
    thumbnail?: string;
    url_overridden_by_dest?: string;
  };
}
