/* eslint-disable no-underscore-dangle */
const NotFoundException = require('../utils/errors/NotFoundException');
const BadRequestException = require('../utils/errors/BadRequestException');
const commentRepository = require('../comment/comment.repository');
const tagRepository = require('../tag/tag.repository');
const postRepository = require('./post.repository');

const getAllPosts = async () => {
  const posts = await postRepository.listPosts();
  return posts.map((post) => ({
    ...post.toObject(),
    upvotes: post.upvotes.length,
    tags: post.tags.map((tag) => tag.name),
  }));
};

const viewPostById = async (postId, userId) => {
  const post = await postRepository.getPostById(postId);
  if (!post) throw new NotFoundException('Post not found');
  if (post.author._id.toString() !== userId) {
    await postRepository.incrementViews(postId);
    post.views += 1;
  }
  return post;
};

const createPost = async (postDetails, authorId) => {
  const { tags } = postDetails;
  const tagDetails = await tagRepository.getOrCreateTags(tags);
  postDetails.tags = tagDetails;
  postDetails.author = authorId;
  return postRepository.createPost(postDetails);
};

const upvotePost = async (postId, userId) => {
  const post = await postRepository.getPostById(postId);
  if (!post) throw new NotFoundException('Post not found');
  if (post.author._id.toString() === userId) {
    throw new BadRequestException("You can't upvote your own post");
  }
  const { upvotes } = post;
  const index = upvotes.indexOf(userId);
  if (index === -1) {
    upvotes.push(userId);
  } else {
    upvotes.splice(index, 1);
  }
  const updatedPost = await postRepository.updatePostById(postId, { upvotes });
  return updatedPost;
};

const commentPost = async (commentBody, postId, authorId) => {
  const post = await postRepository.getPostById(postId);
  if (!post) throw new NotFoundException('Post not found');
  const commentDetails = {
    ...commentBody,
    post: postId,
    author: authorId,
  };
  const { _id: commentId } = await commentRepository.createComment(
    commentDetails,
  );
  return commentRepository.getCommentById(commentId);
};

module.exports.getAllPosts = getAllPosts;
module.exports.viewPostById = viewPostById;
module.exports.createPost = createPost;
module.exports.upvotePost = upvotePost;
module.exports.commentPost = commentPost;
