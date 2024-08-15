// updatePassword.controller.js

import bcrypt from "bcryptjs";
import User from "../../models/user.model.js";

const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default updatePassword;
