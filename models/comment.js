const mongoose = require('mongoose');
const comment = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
    
      
});
const Comment = mongoose.model('Comment',comment);
module.exports = Comment;