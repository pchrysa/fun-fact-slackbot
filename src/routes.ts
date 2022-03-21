import { Router } from 'express';

import { botDailyFunFactHandler } from './controllers/bot/botHandlers';
import { isAuthorised } from './middlewares/isAuthorised';

const router = Router();

router.post('/api/daily-fun-fact', isAuthorised, botDailyFunFactHandler);

export default router;
