import express from 'express';
import { getMe, signin, signup, googleSignup } from '../controllers/user.js';
import { protectRoutes } from '../middlewares/protect.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/get', protectRoutes, getMe);
router.post('/auth/google', googleSignup);

export default router;
