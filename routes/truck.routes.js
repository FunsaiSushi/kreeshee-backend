import express from "express";
import {
  createTruckRentPost,
  getTruckRentPosts,
} from "../controllers/truckControllers/truck.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// Route to create a new truck rental post
router.post("/rent", protectRoute, createTruckRentPost);

// Route to get all truck rental posts with pagination
router.get("/rent/posts", protectRoute, getTruckRentPosts);

export default router;
