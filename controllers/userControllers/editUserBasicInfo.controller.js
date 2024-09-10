import User from "../../models/user.model.js";

const editUserBasicInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user.id` is set by protectRoute middleware after authentication
    const {
      role,
      birthAddress,
      currentAddress,
      workAddress,
      dob,
      gender,
      religion,
      bio,
    } = req.body;

    // Check if at least one field is provided for update
    if (
      !role &&
      !birthAddress &&
      !currentAddress &&
      !workAddress &&
      !dob &&
      !gender &&
      !religion &&
      !bio
    ) {
      return res.status(400).json({ message: "No data provided for update." });
    }

    // Construct the update object dynamically based on provided fields
    const updatedFields = {};
    if (role) updatedFields.role = role;
    if (birthAddress) updatedFields.birthAddress = birthAddress;
    if (currentAddress) updatedFields.currentAddress = currentAddress;
    if (workAddress) updatedFields.workAddress = workAddress;
    if (dob) updatedFields.dob = dob;
    if (gender) updatedFields.gender = gender;
    if (religion) updatedFields.religion = religion;
    if (bio) updatedFields.bio = bio;

    // Find the user and update
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true, // Return the updated user
      runValidators: true, // Ensure Mongoose validators are applied
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "User information updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

export default editUserBasicInfo;
