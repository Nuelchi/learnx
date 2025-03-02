const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7000;

// Import Routes
const courseRoute = require('./Routes/course-routes');
const adminRoute = require('./Routes/admin-routes');
const paymentRoute = require('./Routes/payment-routes');
const userRoute = require('./Routes/user-route')

// Rate limiting
const limiter = rateLimit({
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: "Limit exceeded, please try again in one hour."
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/api', limiter);

// Routes
app.use('/api/course', courseRoute);
app.use('/api/user', adminRoute);
app.use('/api/users', userRoute);
app.use("/api/payments", paymentRoute);

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to the Database!'))
    .catch(error => console.log('Connection failed', error));

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));