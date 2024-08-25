import mongoose from "mongoose";

const demandSchema = new mongoose.Schema(
  {
    creatorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creatorName: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: String, required: true },
    demandStartDate: { type: Date, default: Date.now, required: true },
    demandDeadline: { type: Date, required: true },
    company: { type: String }, // make it required later
    deliveryLocation: { type: String, required: true }, // where do you want your products to be delivered
    contactInfo: { type: String, default: "" },
    offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offer" }],
    // offers to a demand are like comments on a facebook post
    demandNotes: { type: String, default: "" },
    feedback: { type: Object, default: {} },

    // budget: { type: String, default: "" },
    // qualityRequirements: { type: String, default: "" },
    // deliveryPreferences: { type: String, default: "" },
    // packagingRequirements: { type: String, default: "" },
    // specialInstructions: { type: String, default: "" },
    // contractTerms: { type: String, default: "" },
    // paymentTerms: { type: String, default: "" },
    // status: { type: String, enum: ["active", "inactive"], }, depending on demandStartdate and deadline
    // priorityLevel: { type: String, default: "normal" },
  },
  { timestamps: true }
);

const Demand = mongoose.model("Demand", demandSchema);

export default Demand;
