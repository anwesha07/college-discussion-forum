const mongoose = require('mongoose');
// const Joi = require('joi');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  used: {
    type: Number,
    default: 0,
  },
});

const Tag = mongoose.model('Tag', tagSchema);

// function validateTag(tag) {
//   const schema = Joi.object({
//     name: Joi.string().required().min(5).max(25),
//   });
//   return schema.validate(tag);
// }

const getOrCreateTags = (tags) => {
  const tagUpdatePromises = tags.map((tag) => Tag.findOneAndUpdate(
    { name: tag }, { $inc: { used: 1 } }, { new: true, upsert: true },
  ));
  return Promise.all(tagUpdatePromises);
};

module.exports = Tag;
module.exports.tagSchema = tagSchema;
module.exports.getOrCreateTags = getOrCreateTags;
