const jwt = require('jsonwebtoken');

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
        console.log('decoded', decoded);
        req.userId = decoded.id;
    
        next()
    }
    catch(err){
        return res.status(400).send({
            msg : 'Token is not correct'
        })
    }

}



module.exports = {
    verifyToken
}