import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getProducts } from "../controllers/product.controller.js";
const router = Router();

//BASE_URL = http://localhost:8000/api/v1/products
router.route("/").get(verifyJWT, getProducts)

export default router;