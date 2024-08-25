import Demand from "../../models/demand.model.js";

// Controller to create a new demand
export const postDemand = async (req, res) => {
  try {
    const {
      productName,
      quantity,
      demandStartDate,
      demandDeadline,
      deliveryLocation,
      contactInfo,
      demandNotes,
    } = req.body;

    const newDemand = new Demand({
      creatorID: req.user._id,
      creatorName: req.user.name,
      productName,
      quantity,
      demandStartDate,
      demandDeadline,
      deliveryLocation,
      contactInfo,
      demandNotes,
    });

    await newDemand.save();

    res.status(201).json({
      success: true,
      message: "Demand created successfully",
      data: newDemand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create demand",
      error: error.message,
    });
  }
};

// Controller to get demands with pagination
export const getDemands = async (req, res) => {
  try {
    // Get the page and limit query parameters from the request for pagination
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 12; // Default to 12 items per page

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch demands from the database with pagination
    const demands = await Demand.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    // Fetch the total number of demands for pagination metadata
    const totalDemands = await Demand.countDocuments();

    // Respond with the fetched demands and pagination metadata
    res.status(200).json({
      demands,
      pagination: {
        total: totalDemands,
        page,
        pages: Math.ceil(totalDemands / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching demands:", error);
    res.status(500).json({
      message: "An error occurred while fetching the demand posts",
    });
  }
};
