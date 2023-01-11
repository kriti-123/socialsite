// 
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.home = function(req, res){
    Post.find({})
    .populate("user")
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
      })
    .exec(function(err, posts){
        console.log("post aaya hai => ", posts)
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })

}


