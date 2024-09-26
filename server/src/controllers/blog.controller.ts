import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const getBlogs = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const page = Number(req.query.page as string) || 1;
		const limit = Number(req.query.limit as string) || 9;
		const orderBy = req.query.orderBy === 'asc' ? 'asc' : 'desc';

		const blogs = await prisma.blog.findMany({
			skip: (page - 1) * limit,
			take: limit,
			orderBy: {
				createdAt: orderBy,
			},
			select: {
				id: true,
				title: true,
				content: true,
				createdAt: true,
				slug: true,
			},
		});

		if (!blogs) {
			return next(new AppError('No Blogs Found', 404));
		}

		res.status(200).json(blogs);
	}
);

export const getBlog = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const blog = await prisma.blog.findFirst({
			where: {
				slug: req.params.slug,
			},
		});

		if (!blog) {
			return next(new AppError('No Blog Found', 404));
		}

		res.status(200).json(blog);
	}
);

export const createBlog = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { title, content } = req.body;
		const slug = title.toLowerCase().split(' ').join('-');
		const { id }: any = req.user;

		const blog = await prisma.blog.create({
			data: {
				title,
				content,
				slug,
				author: {
					connect: {
						id: id,
					},
				},
			},
		});

		if (!blog) {
			return next(new AppError('Blog Cannot Be Created', 400));
		}

		res.status(201).json(blog);
	}
);

export const updateBlog = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const { title, content } = req.body;

		const dataToUpdate: any = {};
		if (title) dataToUpdate.title = title;
		if (content) dataToUpdate.content = content;

		if (Object.keys(dataToUpdate).length === 0) {
			return next(new AppError('No Data To Update', 400));
		}

		const blog = await prisma.blog.update({
			where: {
				id: id,
			},
			data: dataToUpdate,
		});

		if (!blog) {
			return next(new AppError('Blog Cannot Be Updated', 400));
		}

		res.status(200).json(blog);
	}
);

export const deleteBlog = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const blog = await prisma.blog.delete({
			where: {
				id: id,
			},
		});

		if (!blog) {
			return next(new AppError('Blog Cannot Be Deleted', 400));
		}

		res.status(204).json(null);
	}
);

export const getMyBlogs = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id }: any = req.user;

		const blogs = await prisma.blog.findMany({
			where: {
				authorId: id,
			},
			select: {
				id: true,
				title: true,
				content: true,
				createdAt: true,
				slug: true,
			},
		});

		if (!blogs) {
			return next(new AppError('No Blogs Found', 404));
		}

		res.status(200).json(blogs);
	}
);
