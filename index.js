const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const PORT = process.env.PORT || 7000;


const courseRoute = require('./Routes/course-routes');
const adminRoute = require('./Routes/admin-routes');



//Rate limit
let limiter = rateLimit({
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: "Limit exceeded please try again in one hour"

});

//MIDDLEWARES
app.use(exoress.json());
app.use(express.urlencoded({extended: false}));


//ROUTES
app.use('/api', limiter);
app.use('/api/course', courseRoute);
app.use('/api/user', adminRoute);



//DB CONNECTION 
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to the Database!!'))
    .catch ((error) => console.log('connection failedt', error));



app.listen(PORT, () => console.log(`server running at https://localhost:${PORT}`));