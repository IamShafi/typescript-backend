import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler} from "../utils/asyncHandler.js"
import prisma from "../utils/prismadb.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        // Find the user by ID
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Generate access token
        const accessToken = jwt.sign(
            {
                _id: user.id,
                email: user.email,
                name: user.name
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
            { _id: user.id },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        );

        // // Update user's refresh token in the database
        // await prisma.user.update({
        //     where: { id: user.id },
        //    data: {
        //     refreshToken: refreshToken
        //    }
        // });

        // Return the generated tokens
        return { accessToken, refreshToken };

    } catch (error) {
        // Throw an error if something goes wrong during token generation
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
    }
};


const registerClient = asyncHandler(async(req, res) => {
     // Get user details from the request body
     const { name, email, password } = req.body;

     // Validate user details
    if ([name, email, password].includes("") || !name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }


     // Check if user exists
     const existedUser = await prisma.user.findFirst({
        where: {
            OR: [
                { name: name.toLowerCase() },
                { email: email }
            ]
        }
    });

     if(existedUser){
        throw new ApiError(409, "User with email or username already exists");
     }

     // Hash the password
     const salt = await bcryptjs.genSalt(10);
     const hashedPassword = await bcryptjs.hash(password, salt);

     // Create new user with provided details
     const newUser = await prisma.user.create({
        data: {
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
            role: 'SUPERADMIN' // Default role
        }
     })

     // Remove sensitive fields from the response
    const createdUser = await prisma.user.findUnique({
        where: { id: newUser.id },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Send response
    return res.status(201).json({
        status: 201,
        message: "User registered successfully",
        data: createdUser
    })
})

// Function to log in a user
const loginUser = asyncHandler(async (req, res) => {
    // Get login credentials from request body
    const { email, password } = req.body;

    // Validate login credentials
    if ([email, password].includes("") || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        throw new ApiError(401, "User does not exist");
    }

    // Check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect password");
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user.id);

    // Update user's refresh token in the database
    await prisma.user.update({
        where: { id: user.id },
        data: {
            refreshToken: refreshToken
        }
    })

    // Fetch user details without sensitive fields
    const loggedInUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });

        // Set cookies for tokens
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
            sameSite: 'strict',
        };

        // Send success response with tokens and user details
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged In Successfully"
        )
    );


    })


// Function to log out a user
const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    // Remove refresh token from user record
    await prisma.user.update({
        where:{
            id: userId
        },
        data:{
            refreshToken: null
        }
    });

    // Clear cookies
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
        sameSite: 'strict',
    };

    // Send success response
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
})

export {
    registerClient,
    loginUser,
    logoutUser
}