import { Router } from "express"
//import controllers
import { registerClient, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { getUser, getGeography } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

//BASE_URL = http://localhost:8000/api/v1/user
router.route("/register").post(registerClient)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)

// Get user by id
router.route("/user/:id").get(verifyJWT, getUser)
// Get geography of all users
router.route("/geography").get(verifyJWT, getGeography)

export default router