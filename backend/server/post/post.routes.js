const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const postMiddleware = require('./post.middleware');
const postController = require('./post.controller');

const router = express.Router();

router.get('/', postController.getAllPostsController);

router.get('/:id', authMiddleware, postController.viewPostByIdController);

router.post(
  '/',
  authMiddleware,
  postMiddleware.createPostValidation,
  postController.createPostController,
);

router.put('/upvote/:id', authMiddleware, postController.upvotePostController);

router.post(
  '/comment/:id',
  authMiddleware,
  postMiddleware.commentPostValidation,
  postController.commentPostController,
);

module.exports = router;
