import express from 'express';
import { getMe, signin, signup } from '../controllers/user.js';
import { protectRoutes } from '../middlewares/protect.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/get', protectRoutes, getMe);

export default router;
