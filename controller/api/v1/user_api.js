const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createsession = async function (req, res) {

    try{
       let user = await User.findOne({email:req.body.email});
       if(!user||user.password!=req.body.password){
        return res.json(422,{
            message:"invalid user"
        });
       }
       return res.json(200,{
        message:"signin successfull",
        data:{
            token:jwt.sign(user.toJSON(),'secret',{expiresIn:'1000000'})
        }
    });
    }
    catch(error){
        return res.json(500,{
            message:"interna server error"
        });
    }
}