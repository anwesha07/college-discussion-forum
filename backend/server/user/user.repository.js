/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 5,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function generateAuthToken() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY,
  );
  return token;
};

const User = mongoose.model('User', userSchema);

const getUserByEmail = (email) => User.findOne({ email }).select('-__v');

const getUserById = (id) => User.findById(id).select('-password -__v');

const saveUser = (userDetails) => {
  const user = new User(userDetails);
  return user.save();
};

module.exports = User;
module.exports.getUserByEmail = getUserByEmail;
module.exports.getUserById = getUserById;
module.exports.saveUser = saveUser;
