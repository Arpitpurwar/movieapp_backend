const {ticketCost} = require('../utils/constant');
const Booking = require('../models/booking.model');

async function createBooking(req,res){
    const tempBooking = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: req._id,
        timing: req.body.timing,
        noOfSeats: req.body.noOfSeats,
        totalCost: req.body.noOfSeats * ticketCost
    }
    try{
    const bookingData = await Booking.create(tempBooking);
    res.send({
        msg: 'Booking created succesfully',
        bookingData
    })
    }
    catch(err){
        res.send({msg: 'Booking creation failed', err})
    }
}


module.exports = {
    createBooking
}