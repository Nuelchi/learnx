const axios = require("axios");
require("dotenv").config(); 

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

const paystack = {
  initializePayment: async (email, amount) => {
    try {
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email,
          amount: amount * 100, // Convert Naira to Kobo
          currency: "NGN",
          callback_url: `${FRONTEND_URL}/payment-success`,
        },
        {
          headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error initializing payment:", error.response?.data || error.message);
      throw new Error("Payment initialization failed");
    }
  },

  verifyPayment: async (reference) => {
    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error.response?.data || error.message);
      throw new Error("Payment verification failed");
    }
  },
};

module.exports = paystack;