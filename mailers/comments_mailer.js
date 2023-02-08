const nodeMailer = require('../config/nodemailer');
exports.newComment = (comment) => {
    console.log('inside newComment  ======== mailer', comment);

    nodeMailer.transporter.sendMail({
       from: 'wilmer.anderson79@ethereal.email',
       to: 'wilmer.anderson79@ethereal.email',
       subject: "New Comment Published!",
       html: '<h1>hooray ---your comment is now published!</h1>' 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}