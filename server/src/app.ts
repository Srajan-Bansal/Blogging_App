import express, { Request, Response, NextFunction } from 'express';
// import passport from 'passport';
// import OAuth2Strategy from 'passport-oauth2';
// import session from 'express-session';
import userRoutes from './routes/user.route';
import blogRoutes from './routes/blog.route';
import AppError from './utils/appError';

const app = express();

// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
// 	done(null, user);
// });

// type User = {
// 	profile: any;
// 	accessToken: string;
// };

// passport.deserializeUser((user: User, done) => {
// 	done(null, user);
// });

// passport.use(
// 	new OAuth2Strategy(
// 		{
// 			authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
// 			tokenURL: 'https://oauth2.googleapis.com/token',
// 			clientID: process.env.GOOGLE_CLIENT_ID as string,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
// 			callbackURL: 'http://localhost:8080/auth/google/callback',
// 		},
// 		(
// 			accessToken: string,
// 			refreshToken: string,
// 			profile: any,
// 			done: Function
// 		) => {
// 			const user: User = {
// 				profile,
// 				accessToken,
// 			};
// 			return done(null, user);
// 		}
// 	)
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
// 	res.send('Helfewlo');
// });

// app.get('/auth/google', passport.authenticate('oauth2'));
// app.get(
// 	'/auth/google/callback',
// 	passport.authenticate('oauth2'),
// 	(req: Request, res: Response) => {
// 		const user: User = req.user as User;
// 		console.log(user, 'fwfe');
// 		res.json({
// 			profile: user?.profile,
// 			accessToken: user?.accessToken,
// 		});
// 	}
// );

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

const PORT = 8080;
app.listen(PORT, () => {
	console.log('server listing to PORT ', PORT);
});
