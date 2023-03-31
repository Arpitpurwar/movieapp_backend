

const { validateMovieReqBody } = require('./verifyReqBody');
const { verifyToken, isAdmin} = require('./auth');

module.exports = {
    validateMovieReqBody,
    verifyToken,
    isAdmin
}