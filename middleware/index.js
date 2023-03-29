

const { validateMovieReqBody } = require('./verifyReqBody');
const { verifyToken} = require('./auth');

module.exports = {
    validateMovieReqBody,
    verifyToken
}