import streamifier from "streamifier";

import cloudinary from "../../config/cloudinary.config.js";
import profilePicMulter from "../../config/profilePicMulter.js";
import User from "../../models/user.model.js";

export const uploadProfilePic = async (req, res) => {
  try {
    // Use multer middleware to handle the file upload
    profilePicMulter(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload failed", error: err.message });
      }

      // Check if a file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Function to upload an image buffer to Cloudinary
      const uploadToCloudinary = (fileBuffer, folder) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder,
              public_id: `${Date.now()}`, // Use timestamp as the filename
            },
            (error, result) => {
              if (result) resolve(result.secure_url); // Resolve with the URL
              else reject(error);
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream); // Streamify the buffer
        });
      };

      // Upload the profile picture to Cloudinary under the 'users/' folder
      const profilePicUrl = await uploadToCloudinary(req.file.buffer, "users");

      // Update the user's profilePic field in the database
      const userId = req.user.id; // Assuming user ID is available in req.user.id (make sure this is populated)
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.profilePic = profilePicUrl;
      await user.save();

      // Respond with the updated profile picture URL
      res
        .status(200)
        .json({
          message: "Profile picture uploaded successfully",
          profilePicUrl,
        });
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while uploading the profile picture",
      });
  }
};
