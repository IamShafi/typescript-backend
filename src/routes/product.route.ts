import Router from "express"

const router = Router();

//BASE_URL = http://localhost:8000/product
router.route("/create").post()
router.route("/read/:id").get()
router.route("/update/:id").patch()
router.route("/delete/:id").delete()
router.route("/list").get()
router.route("/search").get()


export default router