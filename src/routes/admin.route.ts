import { Router } from "express"
//import controllers
import {
    list,
    profile,
    createAdmin,
    read,
    updateAdmin,
    deleteAdmin
} from "../controllers/admin.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

//BASE_URL = http://localhost:8000/admin

router.route("/create").post()
router.route("/read/:id").get()
router.route("/update/:id").patch()
router.route("/delete/:id").delete()
router.route("/list").get()
router.route("/search").get()
router.route("password-update/:id").patch()

export default router