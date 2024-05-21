import Router from "express"
// import controllers
import { create } from "../controllers/client.controller.js";


const router = Router();

//BASE_URL = http://localhost:8000/client

router.route("/create").post(create)
router.route("/read/:id").get()
router.route("/update/:id").patch()
router.route("/delete/:id").delete()
router.route("/list").get()
router.route("/search").get()

export default router
