import User from "../../models/user.model.js";

// Controller to get user's basic information
const getUserBasicInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user.id` is set by protectRoute middleware after authentication

    // Find the user by ID and select only the basic info fields
    const user = await User.findById(userId).select(
      "role birthAddress currentAddress workAddress dob gender religion bio"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "User information retrieved successfully.",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

export default getUserBasicInfo;
