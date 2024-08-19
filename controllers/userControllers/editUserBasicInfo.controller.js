import User from "../../models/user.model.js";

const editUserBasicInfo = async (req, res) => {
  const userId = req.userId;

  try {
    // Find the user by ID
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user object with the fields from request body
    for (const key in req.body) {
      if (Object.hasOwnProperty.call(req.body, key)) {
        user[key] = req.body[key];
      }
    }

    // Save the updated user
    user = await user.save();

    res.status(200).json({ message: "User info updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default editUserBasicInfo;
