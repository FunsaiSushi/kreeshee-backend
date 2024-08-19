// supply.model.js

import mongoose from "mongoose";
import { setProduceType } from "../middlewares/supply.middleware.js";

const { Schema } = mongoose;

const supplySchema = new Schema(
  {
    seller: { type: String, required: true }, // Name or ID of the producing company
    productName: { type: String, required: true },
    productType: { type: String },
    productImages: [{ type: String }], // also make this required
    amount: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    price: {
      value: { type: String, required: true }, // String for numerical value and currency
      isFixed: { type: Boolean, default: false }, // Checkbox for indicating if the price is negotiable
    },
    deliveryDate: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    expiryDate: { type: Date }, // Expiry date of the supply
    status: { type: String, default: "pending" }, // Status of the supply (e.g., pending, accepted, rejected)
    notes: { type: String, default: "" }, // Additional notes or comments
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
  },

  { timestamps: true }
);

// Pre-save hook to automatically set the produceType based on the produceName
supplySchema.pre("save", setProduceType);

const supply = mongoose.model("supply", supplySchema);

export default supply;
