

const { validateMovieReqBody } = require('./verifyReqBody');
const { verifyToken, isAdmin} = require('./auth');
const {validateUserReqBody} = require('./validateUserReqBody')

module.exports = {
    validateMovieReqBody,
    verifyToken,
    isAdmin,
    validateUserReqBody
}