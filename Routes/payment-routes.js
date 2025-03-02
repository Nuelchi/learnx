const express = require("express");
const router = express.Router();
const {initPay, verifyPayment} = require('../controllers/payment-controller.js');
const {protectPath} =  require('../authorization.js')


// ✅ Initialize Payment
router.post("/initialize-payment", protectPath,initPay)
// ✅ Verify Payment
router.get("/verify-payment/:reference",verifyPayment)


module.exports = router;