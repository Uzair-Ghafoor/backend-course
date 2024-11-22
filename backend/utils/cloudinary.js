import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
  cloud_name: 'dbj3pmxeh',
  api_key: '365834747999278',
  api_secret: 'kWlCz_uR-eAIVmG7Jl8DMXbjbas',
});
// console.log(process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.CLOUDINARY_API_KEY);
// console.log(process.env.CLOUDINARY_API_SECRET);
export default cloudinary;
