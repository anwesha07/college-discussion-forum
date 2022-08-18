const Joi = require('joi');

const BadRequestException = require('../utils/errors/BadRequestException');

// For registration validattion
const userRegistrationValidationMiddleware = (req, _res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 4,
        maxDomainSegments: 4,
        tlds: { allow: ['in'] },
      })
      .required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    username: Joi.string().required().min(3),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return next(new BadRequestException(error.details[0].message));
  req.body = value;
  return next();
};

const confirmPasswordValidationMiddleware = (req, _res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new BadRequestException('Password and Confirm Password did not match!'),
    );
  }
  delete req.body.confirmPassword;
  return next();
};

// For login validation
const userLoginValidationMiddleware = (req, _res, next) => {
  const loginDetails = req.body;
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required()
      .email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  const { error, value } = schema.validate(loginDetails);
  if (error) return next(new BadRequestException(error.details[0].message));
  req.body = value;
  return next();
};

exports.userRegistrationValidationMiddleware = userRegistrationValidationMiddleware;
exports.confirmPasswordValidationMiddleware = confirmPasswordValidationMiddleware;
exports.userLoginValidationMiddleware = userLoginValidationMiddleware;
