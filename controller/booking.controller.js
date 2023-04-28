const {ticketCost} = require('../utils/constant');
const Booking = require('../models/booking.model');
const User = require('../models/users.models');
const {userTypes} = require('../utils/constant')

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

async function getBookingOnId(req,res){
    try{
        const bookingData = await Booking.findOne({
            _id: req.params.id
        })
        res.send({
            msg: 'Booking Data sucessfully fetched',
            bookingData
        })
    }
    catch(err){
        res.send({
            msg: "get Booking on id api got failed",
            err
        })
    }


}

async function updateBooking(req,res){
    const booking = await Booking.findOne({
        _id: req.params.id
    });

    if(!booking){
        return res.send({
            msg: 'Booking Id does not exist'
        })
    }

    booking.theatreId = req.body.theatreId ? req.body.theatreId : booking.theatreId;
    booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId;
    booking.userId = req.body.userId != undefined ? req.body.userId : booking.userId;
    booking.timing = req.body.timing != undefined ? req.body.timing : booking.timing;
    booking.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : booking.noOfSeats;
    booking.totalCost = booking.noOfSeats * ticketCost;
    booking.status = req.body.status != undefined ? req.body.status : booking.status; 


    try{
        const result = await booking.save();
        res.send({
            msg: 'Booking Id got updated',
            result
        })

    }catch(err){
        res.send({msg: 'Booking updation failed', err})
    }


}

async function getAllBookings(req,res){
    let tempQuery = {}
    const user = await User.findOne({
        _id: req._id
    });

    if(user.userType !== userTypes.ADMIN){
        tempQuery.userId =  req._id;
    }

    try{
        const bookingData = await Booking.find(tempQuery);
        res.send({
            msg: "All booking fetch successfully",
            bookingData
        })
    }
    catch(err){
        res.send({msg: 'get All booking api failed', err})
    }
    

}

module.exports = {
    createBooking,
    getBookingOnId,
    updateBooking,
    getAllBookings
}