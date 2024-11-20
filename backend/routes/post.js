import express from 'express';
import {
  createPost,
  getPost,
  commentOnPost,
  deletePost,
} from '../controllers/post.js';
import { protectRoutes } from '../middlewares/protect.js';
const router = express.Router();

router.post('/create', createPost);
router.post('/:id', protectRoutes, getPost);
router.post('/comment/:id', protectRoutes, commentOnPost);
router.delete('/delete/:id', protectRoutes, deletePost);

export default router;
