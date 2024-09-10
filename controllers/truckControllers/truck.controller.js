import TruckRent from "../../models/truckrent.model.js";

// Controller for posting a truck rental
export const createTruckRentPost = async (req, res) => {
  const { loadDestination, unloadDestination, productName, amount } = req.body;

  if (!loadDestination || !unloadDestination || !productName || !amount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const truckRentPost = new TruckRent({
      loadDestination,
      unloadDestination,
      productName,
      amount,
      user: req.user.id, // Assuming you're using authentication and the user ID is available in req.user
    });

    await truckRentPost.save();

    res.status(200).json({
      message: "Truck rent post created successfully",
      truckRentPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get all truck rent posts with pagination
export const getTruckRentPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number (default is 1)
    const limit = parseInt(req.query.limit) || 10; // Number of posts per page (default is 10)
    const skip = (page - 1) * limit; // Calculate how many posts to skip

    // Get total number of posts for pagination metadata
    const total = await TruckRent.countDocuments();

    // Fetch posts with pagination
    const truckRentPosts = await TruckRent.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip) // Skip the appropriate number of posts for pagination
      .limit(limit); // Limit the number of posts returned

    return res.status(200).json({
      truckRentPosts,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
