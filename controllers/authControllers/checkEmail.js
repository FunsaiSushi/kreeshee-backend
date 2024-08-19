import User from "../../models/user.model.js";
import admin from "../../config/firebaseAdmin.js";

export const checkMongoUser = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    const isEmailUnique = !existingUser;

    res.json({ isUnique: isEmailUnique });
  } catch (error) {
    console.error("Error checking email uniqueness:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const checkFirebaseUser = async (req, res) => {
  const { email } = req.body;

  try {
    // Fetch the user by email from Firebase
    const user = await admin.auth().getUserByEmail(email);

    if (user) {
      // If the user is found, return the user object
      return res.status(200).json({ exists: true, user });
    }
  } catch (error) {
    // If the user is not found, handle it
    if (error.code === "auth/user-not-found") {
      return res.status(200).json({ exists: false });
    } else {
      console.error("Error checking Firebase user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
