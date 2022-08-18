const jwt = require('jsonwebtoken');

const UnauthorizedException = require('../utils/errors/UnauthorizedException');

module.exports = (req, _res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return next(
      new UnauthorizedException('Access denied! No auth token provided'),
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    return next();
  } catch (e) {
    return next(
      new UnauthorizedException('Invalid auth token provided'),
    );
  }
};
