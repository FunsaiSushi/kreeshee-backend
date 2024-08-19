import express from "express";
import {
  postSupply,
  getSupplies,
} from "../controllers/postControllers/supply.controller.js"; // Adjust the path as necessary
import protectRoute from "../middlewares/protectRoute.js"; // Adjust the path as necessary

const router = express.Router();

router.post("/create-supply", protectRoute, postSupply);
router.get("/supplies", getSupplies);

export default router;
