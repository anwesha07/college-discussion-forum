const mongoose = require('mongoose');

const { tagSchema } = require('../tag/tag.repository');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 80,
  },
  tags: {
    type: [tagSchema],
    validate: {
      validator(a) {
        return a && a.length >= 0;
      },
    },
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
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

const Post = mongoose.model('Post', postSchema);

const listPosts = () => Post.find().populate(
  'author',
  'name -_id',
).select(
  '-__v',
);

const getPostById = (id) => Post.findById(id).populate(
  'author',
  'name username',
).select(
  '-__v',
);

const incrementViews = (id) => Post.findByIdAndUpdate(id, { $inc: { views: 1 } });

const createPost = (postDetails) => {
  const newPost = new Post(postDetails);
  return newPost.save();
};

const updatePostById = (id, updatedDetails) => Post.findByIdAndUpdate(
  id, updatedDetails, { new: true },
);

module.exports = Post;
module.exports.listPosts = listPosts;
module.exports.getPostById = getPostById;
module.exports.incrementViews = incrementViews;
module.exports.createPost = createPost;
module.exports.updatePostById = updatePostById;
