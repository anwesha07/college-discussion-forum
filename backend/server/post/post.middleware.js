const Joi = require('joi');

const BadRequestException = require('../utils/errors/BadRequestException');

const createPostValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(10).max(80),
    description: Joi.string().required().min(3).max(1024),
    tags: Joi.array().items(Joi.string()).min(1).max(10),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return next(new BadRequestException(error.details[0].message));
  req.body = value;
  return next();
};

const commentPostValidation = (req, res, next) => {
  const schema = Joi.object({
    comment: Joi.string().required().min(3).max(5000),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return next(new BadRequestException(error.details[0].message));
  req.body = value;
  return next();
};

module.exports.createPostValidation = createPostValidation;
module.exports.commentPostValidation = commentPostValidation;
