import { Post } from '../models/posts.js';
import User from '../models/user.js';
import cloudinary from '../utils/cloudinary.js';

export const createPost = async (req, res) => {
  try {
    const { content, imageUrl } = req.body;
    console.log(imageUrl, content);
    if (imageUrl) {
      const result = await cloudinary.uploader.upload(imageUrl);
      console.log(result);
    }

    const newPost = await Post.create({
      content,
      imageUrl: result.secure_url,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate('userId', 'username email');
    // .select('-_id');
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user = req.user._id;
    const post = await Post.findById(id);

    if (!post) {
      res.status(400).json({ message: 'post has already been deleted.' });
    }
    const commentOnPost = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            user,
            content,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(commentOnPost);
  } catch (error) {
    console.log('console', error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (req.user._id.toString() !== post.userId.toString()) {
      return res
        .status(403)
        .json({ message: 'You can only delete your own post.' });
    }

    const deletePost = await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.log(error);
  }
};
