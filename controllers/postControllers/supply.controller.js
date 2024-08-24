import streamifier from "streamifier";
import cloudinary from "../../config/cloudinary.config.js";
import Supply from "../../models/supply.model.js";
import supplyMulter from "../../config/supplyMulter.js";

export const postSupply = async (req, res) => {
  try {
    // Handle the image uploads using multer
    supplyMulter(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload failed", error: err.message });
      }

      // Extract uploaded files from req.files
      const { productImages } = req.files;

      // Extract postCover index from req.body
      const { postCover } = req.body;

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

      // Extract the rest of the form data from req.body
      const {
        productName,
        quantity,
        buyingOptions,
        retailPriceValue,
        retailPriceUnit,
        wholesalePriceValue,
        wholesalePriceUnit,
        minBidPrice,
        bidUnit,
        description,
      } = req.body;

      // Validate required fields based on buyingOptions
      let retailPrice, wholesalePrice, auction;
      if (buyingOptions === "Retail") {
        if (!retailPriceValue || !retailPriceUnit) {
          return res
            .status(400)
            .json({ message: "Retail price and unit are required" });
        }
        retailPrice = {
          value: retailPriceValue,
          unit: retailPriceUnit,
        };
      } else if (buyingOptions === "Wholesale") {
        if (!wholesalePriceValue || !wholesalePriceUnit) {
          return res
            .status(400)
            .json({ message: "Wholesale price and unit are required" });
        }
        wholesalePrice = {
          value: wholesalePriceValue,
          unit: wholesalePriceUnit,
        };
      } else if (buyingOptions === "Auction") {
        if (!minBidPrice || !bidUnit) {
          return res.status(400).json({
            message: "Minimum bid price and unit are required for auction",
          });
        }
        auction = {
          minBidPrice,
          bidUnit,
        };
      }

      // Get the URL of the selected cover image using the postCover index
      const postCoverImageUrl = uploadedImages[postCover];

      // Create a new supply object
      const newSupply = new Supply({
        sellerID: req.user._id, // User ID
        seller: req.user.name, // Seller's name
        productName,
        productImages: uploadedImages,
        postCoverImage: postCoverImageUrl, // Add cover image URL
        totalQuantity: quantity,
        buyingOptions,
        retailPrice,
        wholesalePrice,
        auction,
        description,
      });

      const savedSupply = await newSupply.save();

      res.status(200).json(savedSupply);
    });
  } catch (error) {
    console.error("Error creating supply post:", error);
    res.status(500).json({
      message: "An error occurred while creating the supply post",
    });
  }
};

export const getSupplies = async (req, res) => {
  try {
    // Get the page and limit query parameters from the request for pagination
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 12; // Default to 10 items per page

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
    res.status(500).json({
      message: "An error occurred while fetching the supply posts",
    });
  }
};
