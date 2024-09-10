import mongoose from "mongoose";

const truckRentSchema = new mongoose.Schema({
  loadDestination: {
    type: String,
    required: true,
    trim: true,
  },
  unloadDestination: {
    type: String,
    required: true,
    trim: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: String, // Accepts string values like '10 tons', '20 kg', etc.
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model and want to associate this with a user
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TruckRent = mongoose.model("TruckRent", truckRentSchema);

export default TruckRent;
