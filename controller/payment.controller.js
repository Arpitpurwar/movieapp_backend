const Booking = require('../models/booking.model');
const Payment = require('../models/payment.model');


async function getAllPayments(req,res){

}

async function getPaymentOnId(req,res){

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
            amount: req.body.amount
        }

        await Payment.create(tempPaymentObject);

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