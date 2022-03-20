export enum BotResponseType {
  inChannel = 'in_channel',
}

export interface BotResponseWithBlocks {
  response_type: BotResponseType;
  blocks: Block[];
}

export interface BotResponseSimple {
  response_type: BotResponseType;
  text: string;
}

export enum BlockTextType {
  mrkdwn = 'mrkdwn',
}

export enum BlockType {
  section = 'section',
  divider = 'divider',
}

export enum BlockAccessoryType {
  image = 'image',
}
export interface Block {
  type: BlockType;
  text?: {
    type: BlockTextType;
    text: string;
  };
  accessory?: {
    type: BlockAccessoryType.image;
    image_url: string;
    alt_text: string;
  };
}

export interface BotParams {
  first: string;
  second: string;
}
