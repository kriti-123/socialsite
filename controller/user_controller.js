const User = require('../models/user')

// module.exports.profile = function (req, res) {
//     if (req.cookies.user_id) {
//         User.findById(req.cookies.user_id, function (err, user) {
//             if (user) {
//                 return res.render('user_profile', {
//                     title: "user profile",
//                     user: user
//                 })
//             }
//             return res.redirect('/users/signin');
//         });

//     }
//     else {
//         return res.redirect('/users/signin');
//     }
// }

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: "kriti shree profile"
    });
}

module.exports.signin = function (req, res) {
    if(req.isAuthenticated()){
         return res.redirect('/users/profile')
    }
    return res.render('signin', {
        title: "kriti shree"
    });
}

module.exports.signup = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
   }
    return res.render('user_singup', {
        title: "kriti"
    });

}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error occured'); return
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error happen in create');
                    return;
                }
                return res.redirect('/users/signin');

            })
        }
        else {
            return redirect('back');
        }

    })

}

module.exports.createsession = function (req, res) {
    return res.redirect('/');
}

module.exports.destroysession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}








