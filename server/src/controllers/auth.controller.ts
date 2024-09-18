import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client/edge';

export async function signup(req: Request, res: Response) {
	res.send('Hello');
}

export const login = async (req: Request, res: Response) => {
	res.send('Hello');
};

export const logout = async (req: Request, res: Response) => {
	res.send('Hello');
};
