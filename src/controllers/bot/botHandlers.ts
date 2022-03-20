import { Request, RequestHandler } from 'express';

import { asyncRoute } from '../asyncRoute';

import BotController from './botController';

export const botDailyFunFactHandler: RequestHandler = asyncRoute(async (req: Request, res) => {
  const controller = new BotController();
  const response = await controller.getDailyFunFact();
  res.send(response);
});
