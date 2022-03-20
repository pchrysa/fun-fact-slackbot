import { NextFunction, Request, Response } from 'express';

export const asyncRoute =
  (func: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
