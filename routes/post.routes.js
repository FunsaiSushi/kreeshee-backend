import express from "express";
import {
  postSupply,
  getSupplies,
} from "../controllers/postControllers/supply.controller.js";
import {
  postDemand,
  getDemands,
} from "../controllers/postControllers/demand.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/create-supply", protectRoute, postSupply);
router.get("/supplies", getSupplies);

router.post("/create-demand", protectRoute, postDemand);
router.get("/demands", getDemands);

export default router;
