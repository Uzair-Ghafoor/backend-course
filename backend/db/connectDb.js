import mongoose from 'mongoose';

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('conncted to db');
  } catch (error) {
    console.log(error);
  }
};
