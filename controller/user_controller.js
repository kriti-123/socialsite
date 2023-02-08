const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "kriti shree profile",
            profile_user: user
        });
    });

}
module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('*****Multer Error: ', err) }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    user.avatar = User.avatarPath + '/' + req.file.filename;

                    // if (user.avatar) {
                        // fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                       
                    // }
                    // user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }

    }
    else {
        req.flash('error', 'unauthorized');
        return res.status(401).send('unauthorized');
    }

}
module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('signin', {
        title: "kriti shree"
    });
}

module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
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
    req.flash('success', "successfully logged in");
    return res.redirect('/');
}

module.exports.destroysession = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "successfully logged out");
        res.redirect('/');
    });
}








