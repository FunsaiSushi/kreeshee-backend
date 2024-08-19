import cloudinary from "../../config/cloudinary.config.js"; // Assuming you have your cloudinary config file
import supplyMulter from "../../config/supplyMulter.js";
import Supply from "../../models/supply.model.js"; // Assuming you have a Supply model
import streamifier from "streamifier";

export const postSupply = async (req, res) => {
  try {
    // Handle the image and video uploads using multer
    supplyMulter(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload failed", error: err.message });
      }

      // Extract uploaded files from req.files
      const { productImages, productVideo } = req.files;

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
              if (result) resolve(result.secure_url); // Resolve with the URL
              else reject(error);
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream); // Streamify the buffer
        });
      };

      // Upload images to Cloudinary
      const uploadedImages = await Promise.all(
        productImages.map(async (image) => {
          const imageUrl = await uploadToCloudinary(
            image.buffer,
            "posts/images",
            "image",
            `${req.body.productName}_${Date.now()}`
          );
          return imageUrl; // Cloudinary image URL
        })
      );

      // Upload video to Cloudinary (if present)
      let uploadedVideo = null;
      if (productVideo && productVideo.length > 0) {
        const video = productVideo[0];
        uploadedVideo = await uploadToCloudinary(
          video.buffer,
          "posts/videos",
          "video",
          `${req.body.productName}_${Date.now()}`
        );
      }

      // Now extract the rest of the form data from req.body
      const {
        seller,
        productName,
        productType,
        amountValue,
        amountUnit,
        priceValue,
        isFixed,
        startDate,
        endDate,
        expiryDate,
        notes,
      } = req.body;

      // Create a new supply object
      const newSupply = new Supply({
        seller,
        productName,
        productType,
        productImages: uploadedImages,
        productVideo: uploadedVideo,
        amount: { value: amountValue, unit: amountUnit },
        price: { value: priceValue, isFixed },
        deliveryDate: {
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
        expiryDate,
        notes,
      });

      // Save the new supply post to the database
      const savedSupply = await newSupply.save();

      // Respond with the newly created supply post
      res.status(200).json(savedSupply);
    });
  } catch (error) {
    console.error("Error creating supply post:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the supply post" });
  }
};

export const getSupplies = async (req, res) => {
  try {
    // Get the page and limit query parameters from the request for pagination
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch supplies from the database with pagination
    const supplies = await Supply.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    // Fetch the total number of supplies for pagination metadata
    const totalSupplies = await Supply.countDocuments();

    // Respond with the fetched supplies and pagination metadata
    res.status(200).json({
      supplies,
      pagination: {
        total: totalSupplies,
        page,
        pages: Math.ceil(totalSupplies / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching supplies:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the supply posts" });
  }
};
