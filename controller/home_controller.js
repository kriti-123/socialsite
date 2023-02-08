const User = require('../models/user');
const Comment = require('../models/comment');
const Post = require('../models/post');
try
{
module.exports.home = async function(req, res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate("user")
    .populate({
        path:'comments',
        populate:{
        path:'user'
        },
        populate:{
            path:'likes'
            }
      }).populate('likes');
      
     let users=await User.find({});
       return res.render('home', {
           title: "Codeial | Home",
           posts:  posts,
           all_users:users
        });

    }
}
catch(error){
    console.log(error);

}




// module.exports.home = function(req, res){
//     Post.find({})
//     .populate("user")
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//       })
//     .exec(function(err, posts){
//          User.find({},function(err,users){
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts:  posts,
//                 all_users:users
//             });
//          });
//         // console.log("post aaya hai => ", posts)
        
//     })

// }


