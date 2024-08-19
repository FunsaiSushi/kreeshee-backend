import fs from "fs";
import path from "path";
import User from "../../models/user.model.js";
import profilePicMulter from "../../config/profilePicMulter.js";
import cloudinary from "../../config/cloudinary.config.js";

const uploadProfilePic = async (req, res) => {
  try {
    // Handle file upload using Multer
    profilePicMulter(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Read the file from disk
      const filePath = path.join(
        __dirname,
        "../../assets/uploads/",
        req.file.filename
      );
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "Kreeshee/user-images",
          width: 300,
          height: 300,
          crop: "fill",
          quality: "auto",
        });

        // Delete the file from disk after uploading to Cloudinary
        fs.unlinkSync(filePath);

        // Update user's profile information in the database with the Cloudinary URL
        const userId = req.user.id; // Assuming you have access to the authenticated user's ID
        await User.findByIdAndUpdate(
          userId,
          { profilePic: result.secure_url },
          { new: true }
        );

        // Respond with the Cloudinary URL of the uploaded profile picture
        return res.status(200).json({ imageUrl: result.secure_url });
      } catch (uploadError) {
        fs.unlinkSync(filePath); // Ensure the file is deleted even if upload fails
        return res.status(500).json({ message: "Cloudinary upload error" });
      }
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default uploadProfilePic;
