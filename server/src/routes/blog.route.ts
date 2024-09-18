import express from 'express';
import {
	createBlog,
	updateBlog,
	getBlog,
	getBlogs,
} from '../controllers/blog.controller';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/create', createBlog);
router.put('/update/:id', updateBlog);

export default router;
