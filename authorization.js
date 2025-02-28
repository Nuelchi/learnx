
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


module.exports = {restriction}