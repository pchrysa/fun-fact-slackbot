import { Router } from 'express';

import { botDailyFunFactHandler } from './controllers/bot/botHandlers';

const router = Router();

router.post('/api/daily-fun-fact', botDailyFunFactHandler);

export default router;
