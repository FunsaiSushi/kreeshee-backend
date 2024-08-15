import express from "express";

import signup from "../controllers/authControllers/signup.controller.js";
import login from "../controllers/authControllers/login.controller.js";
import logout from "../controllers/authControllers/logout.controller.js";
import checkUniqueEmail from "../utils/checkUniqueEmail.js";
import protectRoute from "../middlewares/protectRoute.js";
import updatePassword from "../controllers/authControllers/updatePassword.js";

const router = express.Router();

// Define the route for email uniqueness check
router.post("/check-email", checkUniqueEmail);

// Signup route
router.post("/create-user", signup);

// Login route
router.post("/login", login);

// Logout route
router.post("/logout", logout);

router.post("/update-password", protectRoute, updatePassword);

export default router;
