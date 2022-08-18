/* eslint-disable no-underscore-dangle */
const asyncWrap = require('../utils/asyncWrap');
const userService = require('./user.service');

const registerUserController = asyncWrap(async (req, res) => {
  const userRegistrationDetails = req.body;
  const token = await userService.registerUser(userRegistrationDetails);
  return res.status(201).send({
    status: 'success',
    token,
  });
});

const getUserByIdController = asyncWrap(async (req, res) => {
  const userId = req.params.id;
  const user = await userService.getUserDetails(userId);
  return res.send({
    status: 'success',
    user,
  });
});

const getCurrentUserController = asyncWrap(async (req, res) => {
  const userId = req.user._id;
  const user = await userService.getUserDetails(userId);
  return res.send({
    status: 'success',
    user,
  });
});

const loginUserController = asyncWrap(async (req, res) => {
  const loginDetails = req.body;
  const token = await userService.loginUser(loginDetails);
  return res.status(200).send({
    status: 'success',
    token,
  });
});

module.exports.registerUserController = registerUserController;
module.exports.getUserByIdController = getUserByIdController;
module.exports.getCurrentUserController = getCurrentUserController;
module.exports.loginUserController = loginUserController;
