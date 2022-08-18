/* eslint-disable no-underscore-dangle */
const asyncWrap = require('../utils/asyncWrap');
const postService = require('./post.service');

const getAllPostsController = asyncWrap(async (_req, res) => {
  const posts = await postService.getAllPosts();
  res.send({
    status: 'success',
    posts,
  });
});

const viewPostByIdController = asyncWrap(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const post = await postService.viewPostById(postId, userId);
  res.send({
    status: 'success',
    post,
  });
});

const createPostController = asyncWrap(async (req, res) => {
  const authorId = req.user._id;
  const postDetails = req.body;
  const post = await postService.createPost(postDetails, authorId);
  res.send({
    status: 'success',
    post,
  });
});

const upvotePostController = asyncWrap(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const post = await postService.upvotePost(postId, userId);
  res.send({
    status: 'success',
    post,
  });
});

const commentPostController = asyncWrap(async (req, res) => {
  const commentBody = req.body;
  const postId = req.params.id;
  const authorId = req.user._id;
  const comment = await postService.commentPost(commentBody, postId, authorId);
  res.send({
    status: 'success',
    comment,
  });
});

module.exports.getAllPostsController = getAllPostsController;
module.exports.viewPostByIdController = viewPostByIdController;
module.exports.createPostController = createPostController;
module.exports.upvotePostController = upvotePostController;
module.exports.commentPostController = commentPostController;
