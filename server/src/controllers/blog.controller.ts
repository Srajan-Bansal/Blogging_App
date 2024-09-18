import { Request, Response } from 'express';

export async function createBlog(req: Request, res: Response) {
	res.send('Hello');
}

export async function getBlogs(req: Request, res: Response) {
	res.send('Hello');
}

export async function getBlog(req: Request, res: Response) {
	res.send('Hello');
}

export async function updateBlog(req: Request, res: Response) {
	res.send('Hello');
}
