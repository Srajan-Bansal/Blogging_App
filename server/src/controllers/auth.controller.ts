import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

const signup = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, email, password, passwordConfirm } = req.body;

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
				passwordConfirm,
			},
		});

		res.status(200).json(user);
	}
);

export default signup;
