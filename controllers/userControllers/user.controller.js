import User from "../../models/user.model.js";

const getUserData = async (req, res) => {
  try {
    const userId = req.user._id;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getUserData;
