import express from 'express';
import {
	createBlog,
	updateBlog,
	getBlog,
	getBlogs,
	deleteBlog,
	getMyBlogs,
} from '../controllers/blog.controller';
// import { isAuthenticated } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/create', createBlog);
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);
router.get('userBlogs', getMyBlogs);

export default router;
