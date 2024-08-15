import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: String,
    password: {
      type: String,
      required: true,
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: [
        "Farmer",
        "Agri-input Dealer",
        "Local Trader",
        "Processor",
        "Storer",
        "Transporter",
        "Distributor",
        "Retailer",
        "Customer",
        "Agriculture Advisor",
        "Engineer",
        "Researcher",
        "Other",
      ],
      required: true,
    },

    birthAddress: String,
    currentAddress: String,
    workAddress: String,

    profilePic: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    religion: {
      type: String,
      default: "",
    },
    dob: Date,
    bio: String,

    partners: [{ type: Schema.Types.ObjectId, ref: "User" }],

    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

    likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

    pinnedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

    savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

    recentSearches: [{ type: String }],

    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],

    blockedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],

    themePreference: {
      type: String,
      default: "light", // or 'dark'
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
