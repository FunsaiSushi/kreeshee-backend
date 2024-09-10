import express from "express";
import {
  postSupply,
  getSupplies,
} from "../controllers/postControllers/supply.controller.js";
import {
  postDemand,
  getDemands,
  getDemandDetails,
} from "../controllers/postControllers/demand.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
import { postOffer } from "../controllers/postControllers/offer.controller.js";

const router = express.Router();

router.post("/create-supply", protectRoute, postSupply);
router.get("/supplies", getSupplies);

router.post("/create-demand", protectRoute, postDemand);
router.get("/demands", getDemands);
router.get("/demands/:demandId", getDemandDetails);

router.post("/create-offer", protectRoute, postOffer);

export default router;
