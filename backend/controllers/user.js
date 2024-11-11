import User from '../models/user.js';

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
    const newUser = await User.create({
      username,
      email,
      password,
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
