import { Post } from '../models/posts.js';
import User from '../models/user.js';
import fs from 'fs';
import cloudinary from '../utils/cloudinary.js';

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      width: 400,
      height: 400,
      crop: 'fill',
      transformations: [{ format: 'jpg' }],
    });
    console.log(result);
    const imageUrl = result.secure_url;
    const newPost = await Post.create({
      content,
      imageUrl,
    });
    fs.unlinkSync(req.file.path);

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error Creating Post:', error);
    res.status(500).json({ error: 'Failed to create post' });
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

    //https://res.cloudinary.com/dbj3pmxeh/image/upload/v1732256188/fsqj2ghytehr4lcaap8h.png

    const image_id = post.imageUrl.split('/').pop().split('.')[0];

    await cloudinary.uploader.destroy(image_id);

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};
