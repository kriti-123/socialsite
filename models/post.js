const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');
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
   likes: [
         {
           type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
         }
      ],
   avatar:{
         type:String
     }
});

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, path.join(__dirname,'..',AVATAR_PATH));
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     cb(null, file.fieldname + '-' + uniqueSuffix)
   }
 });
 userPost.statics.postUploadedAvatar = multer({ storage: storage }).single('avatar');
 userPost.statics.avatarPath = AVATAR_PATH;

const Post = mongoose.model("Post", userPost);
module.exports = Post;
