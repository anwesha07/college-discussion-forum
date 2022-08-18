const bcrypt = require('bcrypt');

const BadRequestException = require('../utils/errors/BadRequestException');
const NotFoundException = require('../utils/errors/NotFoundException');
const userRepository = require('./user.repository');

const registerUser = async (userRegistrationDetails) => {
  const user = await userRepository.getUserByEmail(userRegistrationDetails.email);
  if (user) throw new BadRequestException('User already registered');

  userRegistrationDetails.password = await bcrypt.hash(
    userRegistrationDetails.password, 10,
  );
  const newUser = await userRepository.saveUser(userRegistrationDetails);
  const token = newUser.generateAuthToken();
  return token;
};

const getUserDetails = async (userId) => {
  const user = await userRepository.getUserById(userId);
  if (!user) throw new NotFoundException('No user found');
  return user;
};

const loginUser = async (loginDetails) => {
  const user = await userRepository.getUserByEmail(loginDetails.email);
  if (!user) throw new BadRequestException('Invalid email or password');

  const validPassword = await bcrypt.compare(loginDetails.password, user.password);
  if (!validPassword) throw new BadRequestException('Invalid email or password');

  const token = user.generateAuthToken();
  return token;
};

module.exports.registerUser = registerUser;
module.exports.getUserDetails = getUserDetails;
module.exports.loginUser = loginUser;
