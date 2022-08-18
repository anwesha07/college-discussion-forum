const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true,
  },
  comment: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 5000,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  upvotes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

const createComment = (commentDetails) => {
  const newComment = new Comment(commentDetails);
  return newComment.save();
};

const getCommentById = (id) => Comment.findById(id).populate(
  'author', 'name -_id',
).select(
  '-post -__v',
);

module.exports = Comment;
module.exports.createComment = createComment;
module.exports.getCommentById = getCommentById;
