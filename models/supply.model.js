import mongoose from "mongoose";
import { setProduceType } from "../middlewares/supplyType.js";

const { Schema } = mongoose;

const supplySchema = new Schema(
  {
    sellerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    productName: { type: String, required: true },
    productType: { type: String },
    productImages: [{ type: String, required: true }],
    postCoverImage: { type: String, required: true },
    buyingOptions: {
      type: String,
      enum: ["Retail", "Wholesale", "Auction"],
      required: true,
    },
    totalQuantity: { type: String, required: true },
    retailPrice: {
      value: { type: String },
      unit: { type: String },
    },
    wholesalePrice: {
      value: { type: String },
      unit: { type: String },
    },
    auction: {
      minBidPrice: { type: String }, // Minimum bid price for auction
      bidUnit: { type: String }, // e.g., "100 tk per 1 kg"
    },
    status: { type: String, default: "pending" }, // Status of the supply
    description: { type: String, default: "" }, // Additional notes or comments
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference to Review documents
  },
  { timestamps: true }
);

supplySchema.pre("save", setProduceType);

const Supply = mongoose.model("Supply", supplySchema);

export default Supply;
