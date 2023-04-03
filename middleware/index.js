

const { validateMovieReqBody } = require('./verifyMovieReqBody');
const { verifyToken, isAdmin} = require('./auth');
const {validateUserReqBody, validateUserProfile} = require('./validateUserReqBody')
const {validateTheatreRequestBody} = require('./verifyTheatreReqBody')
const { validateBookingReqBody } = require('./validateBookingReqBody')
const { validatePaymentReqBody } = require('./validatePaymentReqBody')

module.exports = {
    validateMovieReqBody,
    verifyToken,
    isAdmin,
    validateUserReqBody,
    validateUserProfile,
    validateTheatreRequestBody,
    validateBookingReqBody,
    validatePaymentReqBody
}