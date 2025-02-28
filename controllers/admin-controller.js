const admin = require('../models/admin-model.js');
const user = require('../models/user-model.js');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')

const createAdmin = async (req, res) => {
    try {
        const user = await admin.create(req.body);
        res.status(200).json({ message: 'You have signed up successfully!!, you can now login to gain full access' });

    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

const loginAdmin = async (req, res) => {
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

        res.status(200).json({ message: 'you have signed in successfully!!' });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await user.find();

        // Check if there are no users
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found!' });
        }

        // Return the list of users
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        // Handle any server errors
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
};


module.exports = { createAdmin, loginAdmin, getAllUsers};
