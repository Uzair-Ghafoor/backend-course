import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDb.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
import cors from 'cors';
import postRouter from './routes/post.js';
import fileUpload from 'express-fileupload';
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
dotenv.config();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/post', postRouter);

app.listen(3000, async () => {
  await connectDB(process.env.MONGO_URI);
  console.log('server connected');
});
