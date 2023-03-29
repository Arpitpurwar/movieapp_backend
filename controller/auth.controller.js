const {userTypes, userStatus} = require("../utils/constant");
const bcrypt = require('bcrypt');
const User = require('../models/users.models');

async function signUp(req, res){
    let userstatus = userStatus.APPROVED;

    if(req.body.userType && req.body.userType != userTypes.CUSTOMER){
        userstatus = userStatus.PENDING;
    }

    const userObject = {
        name: req.body.name,
        email: req.body.email,
        userId: req.body.userId,
        password: bcrypt.hashSync(req.body.password, 8),
        userType: req.body.userType,
        userStatus: userstatus
    }

    try{
        await User.create(userObject);
        res.send({
            msg : 'user has been created succesfully'
        })
    }catch(err)
    {
        res.status(400).send({
            msg: 'user have not been created succesfully',
            err
        })
    }


}


module.exports = {
    signUp
}