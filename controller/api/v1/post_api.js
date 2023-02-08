const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate("user")
    .populate({
        path:'comments',
        populate:{
        path:'user'
        }
      });
    return res.json(200,{
        message:"post list",
        posts:posts
    })
}

module.exports.destroy = async function (req, res) {
    let post = await Post.findById(req.params.id);
    console.log(post.user==req.user.id);
    console.log(post.user);
    console.log(req.user);
    try{
        if(post.user==req.user.id)
        {
        post.remove();

        await Comment.deleteMany({ post: req.params.id });
        return res.json(200,{
            message:"successfull Delete the message"
        });
       }
       else{
        return res.json(401,{
            message:"you can't delete the message"
        });
       }
}
    catch(error){
        return res.json(500,{
            message:"interna server error"
        });
    }
    
}