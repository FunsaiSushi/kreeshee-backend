import express from "express";
import {
  searchSupply,
  searchDemand,
  searchBoth,
  getSuggestions,
} from "../controllers/search/search.controller.js";

const router = express.Router();

router.get("/supply/:productName", searchSupply);
router.get("/demand/:productName", searchDemand);
router.get("/:productName", searchBoth);
router.get("/suggestions/:productName", getSuggestions);

export default router;
