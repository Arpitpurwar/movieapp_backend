const Booking = require('../models/booking.model');
const Payment = require('../models/payment.model');
const User = require('../models/users.models');
const {userTypes} = require('../utils/constant');
const {sendMail} = require('../utils/mail');


async function getAllPayments(req,res){
    let tempQuery = {}
    const user = await User.findOne({
        _id: req._id
    });

    if(user.userType !== userTypes.ADMIN){
        const bookings = await Booking.find({
            userId: user._id
        })

        const bookingIds = bookings.map( a => a._id);
        console.log('boookingiDs', bookingIds);
        tempQuery.bookingId = {$in: bookingIds }
    }

    try{
        const paymentData = await Payment.find(tempQuery);
        res.send({
            msg: "All Payments fetched successfully",
            paymentData
        })
    }
    catch(err){
        res.send({msg: 'get All booking api failed', err})
    }
}

async function getPaymentOnId(req,res){
    const paymentInfo = await Payment.findOne({
        _id: req.params.id
    });

    res.send(paymentInfo)
}

async function createPayment(req,res){
    try{
    const booking = await Booking.findOne({
        _id: req.body.bookingId
    });

    const creationTime = booking.createdAt;
    const currentTime = Date.now();

    const minutes =  Math.floor(((currentTime - creationTime)/1000)/60);

    if(minutes > 5){
        booking.status = 'EXPIRED';
        await booking.save();
        return res.send({msg: `Can't do the payment as the booking is delayed and expired`
        })
    }
    else{
        booking.status = 'COMPLETED';
        await booking.save();

        const tempPaymentObject = {
            bookingId: req.body.bookingId,
            amount: req.body.amount,
            status: "SUCCESS"
        }

       const payment =  await Payment.create(tempPaymentObject);

       const user = await User.findOne({
        _id: req._id
       })

        const body = {
            paymentId: payment._id,
            paymentStatus: payment.status,
            booking,
        }

        await sendMail(`Payment is successfull for this booking ${req.body.bookingId}`,
        JSON.stringify(body),user.email);
        return res.send({
            msg: 'payment is done'})
        }
    } catch(err){
        res.send({
            msg : 'Payment creation failed',
            err
        })
    }
    
}


module.exports = {
    createPayment,
    getAllPayments,
    getPaymentOnId
}