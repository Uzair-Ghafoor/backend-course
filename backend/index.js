import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDb.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
const app = express();
app.use(cookieParser());
app.use(express.json());
dotenv.config();

app.use('/api/v1/users', userRouter);

app.listen(3000, async () => {
  await connectDB(process.env.MONGO_URI);
  console.log('server connected');
});
