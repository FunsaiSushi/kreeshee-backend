// demand.model.js

import mongoose from "mongoose";

const demandSchema = new mongoose.Schema(
  {
    produceType: { type: String, required: true },
    produceName: { type: String, required: true },
    amount: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    timeFrame: { type: String, required: true },
    company: { type: String, required: true },
    offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offer" }],
    location: { type: String, default: "" },
    contactInfo: { type: String, default: "" },
    qualityRequirements: { type: String, default: "" },
    deliveryPreferences: { type: String, default: "" },
    budget: { type: String, default: "" },
    packagingRequirements: { type: String, default: "" },
    specialInstructions: { type: String, default: "" },
    status: { type: String, default: "open" },
    priorityLevel: { type: String, default: "normal" },
    feedback: { type: Object, default: {} },
    contractTerms: { type: String, default: "" },
    expiryDate: { type: Date },
    paymentTerms: { type: String, default: "" },
  },
  { timestamps: true }
);

const Demand = mongoose.model("Demand", demandSchema);

export default Demand;
