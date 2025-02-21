import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log('checking req.user auth')
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('unauthorized user');
  res.status(401).json({ error: 'Unauthorized' });
};


export default isAuthenticated;