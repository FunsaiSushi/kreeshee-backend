import express from "express";

import signup from "../controllers/authControllers/signup.controller.js";
import login from "../controllers/authControllers/login.controller.js";
import logout from "../controllers/authControllers/logout.controller.js";
import {
  checkMongoUser,
  checkFirebaseUser,
} from "../controllers/authControllers/checkEmail.js";
import protectRoute from "../middlewares/protectRoute.js";
import updatePassword from "../controllers/authControllers/updatePassword.js";

const router = express.Router();

// check mongodob if email exists
router.post("/check-mongo-user", checkMongoUser);

// check firebase if email exists
router.post("/check-firebase-user", checkFirebaseUser);

// Signup route
router.post("/create-user", signup);

// Login route
router.post("/login", login);

// Logout route
router.post("/logout", logout);

router.post("/update-password", protectRoute, updatePassword);

export default router;
