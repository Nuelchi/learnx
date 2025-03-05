const User = require("../models/user-model");

const subAuth = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user || (!user.isSubscribed && user.role !== "admin")) {
        return res.status(403).json({ message: "Access denied. Subscription required." });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };



module.exports = { subAuth}