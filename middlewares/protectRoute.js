import admin from "../config/firebaseAdmin.js"; // Adjust the path as necessary
import User from "../models/user.model.js"; // Adjust the path to your User model

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    // Find the MongoDB user using the Firebase UID
    const user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Set the user object, including the MongoDB _id, in req.user

    next();
  } catch (error) {
    console.error("Error verifying Firebase token", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default protectRoute;
