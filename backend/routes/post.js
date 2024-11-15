import express from 'express';
import { createPost, getPost, commentOnPost } from '../controllers/post.js';
import { protectRoutes } from '../middlewares/protect.js';
const router = express.Router();

router.post('/create', protectRoutes, createPost);
router.post('/:id', protectRoutes, getPost);
router.post('/comment/:id', protectRoutes, commentOnPost);

export default router;
