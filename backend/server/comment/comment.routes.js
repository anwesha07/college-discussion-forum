const express = require('express');

const router = express.Router();

// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//   } catch (ex) {
//     return res.status(400).send("The Post with given ID doesn't exists!");
//   }
//   const replies = await Reply.find({ post: req.params.id }).populate(
//     'author',
//     'name username',
//   );
//   res.send(replies);
// });

// router.put('/like/:id', auth, async (req, res) => {
//   const reply = await Reply.findById(req.params.id);
//   if (!reply) return res.status(400).send("reply doesn't exists");
//   if (reply.author == req.user._id) { return res.status(400).send("You can't upvote your own reply"); }
//   const upvoteArray = reply.upvotes;
//   const index = upvoteArray.indexOf(req.user._id);
//   if (index === -1) {
//     upvoteArray.push(req.user._id);
//   } else {
//     upvoteArray.splice(index, 1);
//   }
//   reply.upvotes = upvoteArray;
//   const result = await reply.save();
//   const reply_new = await Reply.find({ _id: reply._id }).populate(
//     'author',
//     'name username',
//   );
//   res.send(reply_new);
// });

module.exports = router;
