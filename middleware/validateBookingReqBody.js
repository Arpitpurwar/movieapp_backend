const ObjectId = require('mongoose').Types.ObjectId;
const Theatre = require('../models/theatre.model');

async function validateBookingReqBody(req, res, next){
    if(!req.body.theatreId){
        return res.status(400).send({
            msg: 'theatreId is required'
        })
    }

    if(!ObjectId.isValid(req.body.theatreId)){
        return res.status(400).send({
            msg: 'theatreId format is not correct'
        })
    }

    const theatre = await Theatre.findOne({
        _id: req.body.theatreId
    })

    if(!theatre){
        return res.status(400).send({
            msg: 'This theatre does not exist in DB'
        })
    }

    if(!req.body.movieId){
        return res.status(400).send({
            msg: 'movieId is required'
        })
    }

    if(!ObjectId.isValid(req.body.movieId)){
        return res.status(400).send({
            msg: 'movieId format is not correct'
        })
    }

    if(!theatre.movies.includes(req.body.movieId)){
        return res.status(400).send({
            msg: `This movieId ${req.body.movieId} does not 
            exist in this theatreId ${req.body.theatreId}`
        })
    }

    if(!req.body.timing){
        return res.status(400).send({
            msg: 'timing is required'
        })
    }

    if(!req.body.noOfSeats){
        return res.status(400).send({
            msg: 'noOfSeats is required'
        })
    }

    next();
}

module.exports = {
    validateBookingReqBody
}