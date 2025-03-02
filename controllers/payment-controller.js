const paystack = require("../config-paystack");
const Payment = require("../models/payment-model");
const User = require("../models/user-model.js");


const initPay = async (req, res) => {
    try {
        const userId = req.user._id;
        const name = req.user.name;
        const userEmail = req.user.email;
        const amount = 5000.00; // Subscription fee (convert to kobo)

        const payment = await paystack.initializePayment(userEmail, amount);

        if (!payment || !payment.data) {
            return res.status(400).json({ error: "Payment initialization failed" }); // 🛑 Return here
        }

        // Save transaction as 'pending'
        const newPayment = new Payment({
            userId,
            name,
            userEmail,
            amount: 5000,
            reference: payment.data.reference,
            status: "pending",
        });

        await newPayment.save();

        return res.json({ authorization_url: payment.data.authorization_url }); // 🛑 Always return after sending response
    } catch (error) {
        console.error("Payment Error:", error);
        if (!res.headersSent) { // ✅ Prevents double response issue
            return res.status(500).json({ error: "Payment initialization failed" });
        }
    }
};

const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const payment = await paystack.verifyPayment(reference);

    // Find payment in database
    const savedPayment = await Payment.findOne({ reference });
    if (!savedPayment) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (payment.data.status === "success") {
      savedPayment.status = "success";

      // ✅ Mark user as subscribed
      await User.findByIdAndUpdate(savedPayment.userId, { isSubscribed: true });

    } else {
      savedPayment.status = "failed";
    }

    await savedPayment.save();

    return res.json({ message: "Payment verified successfully", payment: savedPayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  module.exports = { initPay, verifyPayment };