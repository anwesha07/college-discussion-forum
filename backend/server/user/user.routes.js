const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');

const userMiddleware = require('./user.middleware');
const userController = require('./user.controller');

const router = express.Router();

router.post(
  '/register',
  userMiddleware.userRegistrationValidationMiddleware,
  userMiddleware.confirmPasswordValidationMiddleware,
  userController.registerUserController,
);

router.get('/me', authMiddleware, userController.getCurrentUserController);

router.get('/:id', userController.getUserByIdController);

router.post(
  '/login',
  userMiddleware.userLoginValidationMiddleware,
  userController.loginUserController,
);

module.exports = router;
