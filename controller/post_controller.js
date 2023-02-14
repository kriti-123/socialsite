const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const User = require('../models/user')
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
            name: req.user.name,
            // avtar:req.user.avtar
        });
        let user = await User.findById(req.params.id);
        Post.postUploadedAvatar(req, res,function(err){
            if(err){
                console.log('the multer error un post=======');
            }
            if (req.file) {
                console.log("hi suuccessfully uploaded pic ");
                user.post.avatar = Post.avatarPath + '/' + req.file.filename;
            }
        });

        if (req.xhr) {
            console.log(req.user);
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "post created"
            })
        }
        req.flash('success', 'post published!');
        return res.redirect('back');
    }
    catch (error) {
        req.flash('error', err);
        return res.redirect('back');
    }
}


module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            await Like.deleteMany({ likeable: post, onModel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.comments } });
            post.remove();
            let deletePostComment = await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            return res.redirect('back');
        }
        else {
            req.flash('error', 'you can not delete the post!');
            return req.redirect('back');
        }
    }

    catch (error) {
        req.flash('error', error);
        return res.redirect('back');
        // console.log(error);
    }
}
