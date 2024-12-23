import jwt from 'jsonwebtoken';
import User from '../models/user.js';
export const protectRoutes = async (req, res, next) => {
  const token = req.cookies.secret;
  if (!token) {
    return res
      .status(401)
      .json({ message: 'You must be logged to get full access.' });
  }
  //if the token is valid or not

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  req.user = user;
  //next
  next();
};
