import Supply from "../../models/supply.model.js";
import Demand from "../../models/demand.model.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const searchSupply = async (req, res) => {
  try {
    const productName = req.params.productName?.toLowerCase();
    const page = parseInt(req.query.page) || DEFAULT_PAGE;
    const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    if (!productName)
      return res.status(400).json({ error: "Product name is required" });

    const results = await Supply.find({
      productName: { $regex: productName, $options: "i" },
    })
      .select("productName seller productImages postCoverImage buyingOptions")
      .skip(skip)
      .limit(limit);

    const total = await Supply.countDocuments({
      productName: { $regex: productName, $options: "i" },
    });

    res.json({ type: "supply", page, limit, total, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchDemand = async (req, res) => {
  try {
    const productName = req.params.productName?.toLowerCase();
    const page = parseInt(req.query.page) || DEFAULT_PAGE;
    const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    if (!productName)
      return res.status(400).json({ error: "Product name is required" });

    const results = await Demand.find({
      productName: { $regex: productName, $options: "i" },
    })
      .select(
        "productName creatorName quantity demandDeadline deliveryLocation"
      )
      .skip(skip)
      .limit(limit);

    const total = await Demand.countDocuments({
      productName: { $regex: productName, $options: "i" },
    });

    res.json({ type: "demand", page, limit, total, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchBoth = async (req, res) => {
  try {
    const productName = req.params.productName?.toLowerCase();
    const page = parseInt(req.query.page) || DEFAULT_PAGE;
    const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    if (!productName)
      return res.status(400).json({ error: "Product name is required" });

    const supplyResults = await Supply.find({
      productName: { $regex: productName, $options: "i" },
    })
      .select("productName seller productImages postCoverImage buyingOptions")
      .skip(skip)
      .limit(limit);

    const demandResults = await Demand.find({
      productName: { $regex: productName, $options: "i" },
    })
      .select(
        "productName creatorName quantity demandDeadline deliveryLocation"
      )
      .skip(skip)
      .limit(limit);

    const totalSupply = await Supply.countDocuments({
      productName: { $regex: productName, $options: "i" },
    });

    const totalDemand = await Demand.countDocuments({
      productName: { $regex: productName, $options: "i" },
    });

    res.json({
      type: "both",
      page,
      limit,
      totalSupply,
      totalDemand,
      supplyResults,
      demandResults,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const productName = req.params.productName?.toLowerCase();
    if (!productName) return res.json({ suggestions: [] });

    const supplySuggestions = await Supply.find({
      productName: { $regex: `^${productName}`, $options: "i" },
    })
      .limit(5)
      .select("productName");

    const demandSuggestions = await Demand.find({
      productName: { $regex: `^${productName}`, $options: "i" },
    })
      .limit(5)
      .select("productName");

    const suggestions = [
      ...new Set([...supplySuggestions, ...demandSuggestions]),
    ];

    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
