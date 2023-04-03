const ObjectId = require('mongoose').Types.ObjectId;
const Booking = require('../models/Booking.model');

async function validatePaymentReqBody(req, res, next){
    if(!req.body.bookingId){
        return res.status(400).send({
            msg: 'bookingId is required'
        })
    }

    if(!ObjectId.isValid(req.body.bookingId)){
        return res.status(400).send({
            msg: 'bookingId format is not correct'
        })
    }

    const booking = await Booking.findOne({
        _id: req.body.bookingId
    })

    if(!booking){
        return res.status(400).send({
            msg: 'This Booking does not exist in DB'
        })
    }

    if(req.body.amount !== booking.totalCost){
        return res.status(400).send({
            msg: 'please enter correct amount which is'+booking.totalCost
        })
    }

    next();
}

module.exports = {
    validatePaymentReqBody
}