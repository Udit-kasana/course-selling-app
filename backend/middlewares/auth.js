const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");

// Auth middleware
const auth = async (req, res, next) => {
  try {
    // Get token from headers: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    if (!token) {
      return res.status(401).json({ message: "Invalid token format." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);

    // Attach user to request
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user; // attach the full user object or just user._id if you prefer
    next(); // proceed to the route
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token.", error: err.message });
  }
};

module.exports = { auth };
