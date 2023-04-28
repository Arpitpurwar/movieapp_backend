const jwt = require('jsonwebtoken');
const User = require('../models/users.models');
const Theatre = require('../models/theatre.model');

async function verifyToken(req, res, next){
    const userToken = req.headers['x-access-token'];
    if(!userToken){
        return res.status(400).send({
            msg : 'Please provide token to proceed'
        })
    }
    try{
        const decoded = await jwt.verify(userToken, 'heyeyehehyhhyh');
        if(!decoded){
            return res.status(400).send({
                msg : 'Token is not correct'
            })
        }
        req._id = decoded.id;
    
        next()
    }
    catch(err){
        return res.status(400).send({
            msg : 'Token is not correct'
        })
    }

}

async function isAdmin(req, res, next){
    const id = req._id;

    const user = await User.findOne({
        _id: id
    })
    console.log('user', user);
    if(user && user.userType !=='ADMIN' && user.userStatus !== 'APPROVED'){
        return res.status(400).send({
            msg :"Only Admin allowed to do this operation"
        })
    }

    next();
}

async function isAdminOrClient(req, res, next){
    const id = req._id;

    const user = await User.findOne({
        _id: id
    })

    if(user && user.userStatus === 'APPROVED'){
        if(user.userType === 'ADMIN'){
            next();
        }else if(user.userType === 'CLIENT'){
            const theatre = await Theatre.findOne({
                ownerId: id,
                _id: req.params.id
            });
            if(!theatre){
                return res.status(400).send({
                    msg :`This user ${id} is not the owner of this theatre ${req.params.id}`
                })
            }else{
                next();
            }

        }else{
            return res.status(400).send({
                msg :"User is not admin not any client"
            })
        }
    }else{
        return res.status(400).send({
            msg :"User is not approved"
        })
    }
}


module.exports = {
    verifyToken,
    isAdmin,
    isAdminOrClient
}