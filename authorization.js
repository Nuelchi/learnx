const jwt = require('jsonwebtoken')
const User = require('./models/user-model.js')
//middleware to restriction certain users from performing some roles
const restriction = (role) => {
    return (req, res, next) => {
        // Check if the user's role matches the required role
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'You do not have access to perform this action' });
        }
        next(); // Allow access to the next middleware or route handler
    };
};

const protectPath = async (req, res, next) => {

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'please provide an Acesss token' })
    }

    if (authorizationHeader && authorizationHeader.toLowerCase().startsWith('bearer')) {
        const token = authorizationHeader.split(' ')[1]; // Extract the token part

        // Proceed to verify the token
        try {
            const decoded = await jwt.verify(token, process.env.SECRET_STRING);
            const user = await User.findById(decoded.id);

            if (!user) {
                res.status(400).json({ message: 'user with Token not found in DB please sign up or login user' });
            }
            req.user = user;
        } catch (error) {
            console.error('Token verification failed:', error.message);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    } else {
        return res.status(401).json({ message: 'Authorization header missing or invalid' });
    };
    next();
};


module.exports = {restriction, protectPath}