import mongoose from "mongoose";

const { Schema } = mongoose;

// Vote Schema
const voteSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vote: { type: Boolean, required: true }, // true for upvote, false for downvote
  },
  { _id: false } // Avoid creating an _id field for each vote
);

// Review Schema
const reviewSchema = new Schema(
  {
    value: { type: Number, required: true, min: 1, max: 5 }, // Rating value
    comment: { type: String, required: true }, // Review comment
    images: [{ type: String }], // Optional images for the review
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who made the review
    supply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supply",
      required: true,
    }, // Reference to the Supply being reviewed
    votes: [voteSchema], // Array of votes for the review
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export { voteSchema, reviewSchema };
export default Review;
