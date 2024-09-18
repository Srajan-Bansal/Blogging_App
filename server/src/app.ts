import express from 'express';
import userRoutes from './routes/user.route';
import blogRoutes from './routes/blog.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Helfewlo');
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log('server listing to PORT ', PORT);
});
