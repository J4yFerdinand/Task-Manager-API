import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    //* Check if exists a token in the headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      // console.log("No token provided");
      return res.status(401).json({ message: "Unauthorized, required token" });
    }

    //* Extract token from headers
    const token = authHeader.split(" ")[1];

    //* Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);

    //* Validate if decoded ID is a number
    const userId = Number(decoded.id);
    if (isNaN(userId)) {
      console.log("Invalid user ID in the token:", decoded.id);
      return res.status(400).json({ message: "Invalid token" });
    }
    
    //* Search user in DB (excluding password)
    const user = await User.findOne({ id: userId}).select("-password");

    if (!user) {
      console.log("User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    //* Attach user to request
    req.user = user;
    // console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    console.log("Error authenticating user:", error.message);
    return res.status(401).json({ message: "Unauthorized. Invalid token" });
  }
};

export default authMiddleware;