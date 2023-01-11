const mongoose = require("mongoose");
const userPost = new mongoose.Schema({
   content: {
      type: String,
      required: true,
   },

   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },

   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment",
      },
   ],
});
const Post = mongoose.model("Post", userPost);
module.exports = Post;