import express from 'express';
import {
  createPost,
  getPost,
  commentOnPost,
  deletePost,
  getAllPosts,
} from '../controllers/post.js';
import { uploadMiddleware } from '../middlewares/imageUpload.js';
import { protectRoutes } from '../middlewares/protect.js';
const router = express.Router();

router.post('/create', uploadMiddleware, createPost);
router.post('/:id', protectRoutes, getPost);
router.post('/comment/:id', protectRoutes, commentOnPost);
router.delete('/delete/:id', protectRoutes, deletePost);
router.get('/all', protectRoutes, getAllPosts);

export default router;
