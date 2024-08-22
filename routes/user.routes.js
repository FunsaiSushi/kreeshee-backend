import express from "express";

import protectRoute from "../middlewares/protectRoute.js";
import getUserData from "../controllers/userControllers/user.controller.js";
import { uploadProfilePic } from "../controllers/userControllers/profilePic.controller.js";
import editUserBasicInfo from "../controllers/userControllers/editUserBasicInfo.controller.js";

// import {
//   searchUser,
//   getUsersSuggestions,
// } from "../controllers/userControllers/searchUser.controller.js";

const router = express.Router();

router.post("/upload-profile-pic", protectRoute, uploadProfilePic);
router.post("/edit-user-basic-info", protectRoute, editUserBasicInfo);

router.get("/about", protectRoute, getUserData);

// router.get("/search", searchUser);
// router.get("/suggestions", getUsersSuggestions);

export default router;
