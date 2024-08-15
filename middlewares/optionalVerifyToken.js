import admin from "../config/firebaseAdmin.js"; // Adjust the path as necessary
import User from "../models/userModels/user.model.js"; // Adjust the path to your User model

const optionalVerifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(); // Proceed without attaching user if no token is provided
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    // Find the MongoDB user using the Firebase UID
    const user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (user) {
      req.user = user; // Attach MongoDB user to the request if found
    }
  } catch (error) {
    console.error("Error verifying Firebase token", error);
  }
  next();
};

export default optionalVerifyToken;
