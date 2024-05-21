import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { Admin } from "../db/models/admin.model.js";


export const verifyJWT = asyncHandler(async(req, _, next) => {
    try{
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")

        if(!token){
            throw new ApiError(401, "Unauthorized")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const admin = await Admin.findById(decodedToken._id).select("-password")

        if(!admin){
            throw new ApiError(401, "Invalid Access Token")
        }

        req.admin = admin;
        next();
    }
    catch(error){
        throw new ApiError(401, error?.message || "Invalid Access token")
    }
})