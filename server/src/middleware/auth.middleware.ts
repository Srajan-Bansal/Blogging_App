import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.isAuthenticated() || !req.user) {
		return next(new AppError('Unauthorized', 401));
	}
	next();
};
