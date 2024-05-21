import { asyncHandler} from "../utils/asyncHandler.js"

const registerClient = asyncHandler(async(req, res) => {
     // Get user details from the request body
     const { name, email, password } = req.body;
})

export {
    registerClient
}