import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(404).json({ error: 'email is already taken.' });
    }
    const existedUsername = await User.findOne({ username });
    if (existedUsername) {
      return res.status(404).json({ error: 'username is already taken.' });
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log('signup controller', error);
  }
};
//to create a document
// model.create({})
//read a document
//model.find()   will get all the documents of the schema
//model.findOne({})  is used to find a document with a unique filed
//mode.findById({})  is used to find the document based on the _id which mongodb created
// model.findByIdAndUpdate({id},{$set:{req.body},{options}})
//model.findByIdAndDelete({id})

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // .select('-password');
    if (!user) {
      return res.status(404).json({ error: 'no user found with this id.' });
    }
    const correctPassword = await bcryptjs.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ error: 'invalid credentials.' });
    }
    //require('crypto').randomBytes(64).toString('hex');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    const { password: pass, ...others } = user._doc;

    res.cookie('secret', token).status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async (req, res) => {
  try {
    res.status(200).json({ message: 'request reached' });
  } catch (error) {
    console.log(error);
  }
};
