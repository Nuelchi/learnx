const User = require('../models/user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ message: 'You have signed up successfully!!, you can now login to gain full access' });

    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // check if inputs were given
        if (!email || !password) {
            return res.status(404).json({ message: 'Password and Email required' });
        };

        //check if user exists in Data base
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'user with email not found, please ensure you entered the correct email' })
        };

        //check if password matches the user password in Database
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(404).json({ message: 'invalid passsword' });
        };

        //assign access token to the user i fpasword is correct
        const token = jwt.sign({ id: user.id }, process.env.SECRET_STRING, {
            expiresIn: process.env.LOGIN_EXPIRY
        });
        res.cookie('jwt', token);
        res.status(200).json({ message: 'you have signed in successfully!!, your access token can be found in the cookie section' });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



module.exports = { createUser, loginUser};