import mongoose from "mongoose";

const { Schema } = mongoose;

const offerSchema = new Schema(
  {
    sellerID: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    productImages: [{ type: String, required: true }],
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
