import express, { NextFunction } from 'express';
import userRoutes from './routes/user.route';
import blogRoutes from './routes/blog.route';
import prisma from './prisma';
import AppError from './utils/appError';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

process.on('SIGINT', async () => {
	await prisma.$disconnect();
	process.exit(0);
});

app.get('/', (req, res) => {
	res.send('Helfewlo');
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

app.use('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(
	(
		err: AppError,
		req: express.Request,
		res: express.Response,
		next: NextFunction
	) => {
		err.statusCode = err.statusCode || 500;
		err.status = err.status || 'error';

		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log('server listing to PORT ', PORT);
});
