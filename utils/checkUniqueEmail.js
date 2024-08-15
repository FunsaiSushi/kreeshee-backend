import User from "../models/user.model.js";

const checkUniqueEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Query the database to check if the email already exists
    const existingUser = await User.findOne({ email });

    // If existingUser is null, the email is unique; otherwise, it already exists
    const isEmailUnique = !existingUser;

    // Return the result as JSON response
    res.json({ isUnique: isEmailUnique });
  } catch (error) {
    console.error("Error checking email uniqueness:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default checkUniqueEmail;
