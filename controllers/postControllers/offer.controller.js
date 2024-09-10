import streamifier from "streamifier";
import cloudinary from "../../config/cloudinary.config.js";
import Offer from "../../models/offer.model.js";
import Demand from "../../models/demand.model.js";
import offerMulter from "../../config/offerMulter.js";

export const postOffer = async (req, res) => {
  try {
    // Handle the image uploads using multer
    offerMulter(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload failed", error: err.message });
      }

      // Extract uploaded files from req.files
      const { productImages } = req.files;

      // Function to upload an image buffer to Cloudinary
      const uploadToCloudinary = (
        fileBuffer,
        folder,
        resourceType,
        publicId
      ) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder,
              resource_type: resourceType,
              public_id: publicId,
            },
            (error, result) => {
              if (result) resolve(result.secure_url);
              else reject(error);
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      // Upload images to Cloudinary
      const uploadedImages = await Promise.all(
        productImages.map(async (image) => {
          const imageUrl = await uploadToCloudinary(
            image.buffer,
            "offers/images",
            "image",
            `${req.body.seller}_${Date.now()}`
          );
          return imageUrl; // Cloudinary image URL
        })
      );

      // Extract form data from req.body
      const { sellerID, seller, quantity, price, description, demandID } =
        req.body;

      // Validate required fields
      if (!demandID) {
        return res.status(400).json({ message: "Demand ID is required" });
      }

      // Check if the demand exists
      const demand = await Demand.findById(demandID);
      if (!demand) {
        return res.status(404).json({ message: "Demand not found" });
      }

      // Create a new offer object
      const newOffer = new Offer({
        sellerID,
        seller,
        productImages: uploadedImages,
        quantity,
        price,
        description,
        demandID, // Include the demandID here
      });

      const savedOffer = await newOffer.save();

      // Add the offer to the demand's offers array
      demand.offers.push(savedOffer._id);
      await demand.save();

      res.status(200).json(savedOffer);
    });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({
      message: "An error occurred while creating the offer",
    });
  }
};
