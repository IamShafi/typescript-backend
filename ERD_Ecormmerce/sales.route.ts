import { Router } from "express";
import { verifyJWT } from "../src/middleware/auth.middleware.js";
import { getSales } from "../controllers/sales.controller.js";

const router = Router();

//BASE_URL = http://localhost:8000/api/v1/sales
router.route("/").get(verifyJWT, getSales);

export default router;
