const express = require('express');

const userRoutes = require('./user/user.routes');
const postRoutes = require('./post/post.routes');
const commentRoutes = require('./comment/comment.routes');

const router = express.Router();

router.use('/v1/users', userRoutes);
router.use('/v1/posts', postRoutes);
router.use('/v1/comments', commentRoutes);

module.exports = router;
