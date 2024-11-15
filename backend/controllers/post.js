import { Post } from '../models/posts.js';
import User from '../models/user.js';

export const createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { content } = req.body;

    const newPost = await Post.create({
      userId,
      content,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate('userId', 'username email')
      .populate('comments.user', 'username email');

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      return res.statu(404).json({ message: 'no post found with this id' });
    }
    const commentOnPost = await Post.findByIdAndUpdate(
      id,
      {
        $push: { comments: { user: req.user._id, content } },
      },
      { new: true }
    );
    res.status(200).json({ message: 'comment placed successfully.' });
  } catch (error) {
    console.log(error);
  }
};
