const paymentController = require("../controller/payment.controller");
const { verifyToken , validatePaymentReqBody} = require("../middleware");



/**
 * Routes for the booking resource
 */

module.exports = function (app) {
    app.get("/mba/api/v1/payments", [verifyToken], paymentController.getAllPayments); 
    app.get("/mba/api/v1/payments/:id", [verifyToken], paymentController.getPaymentOnId);  
    app.post("/mba/api/v1/payments", [verifyToken, validatePaymentReqBody], paymentController.createPayment);
    
}