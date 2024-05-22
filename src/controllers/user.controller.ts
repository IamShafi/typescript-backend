import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../utils/prismadb.js"
import getCountryIso3 from "country-iso-2-to-3";


const getUser = asyncHandler(async (req, res) => {
    try{
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: { id }
        })
        if(!user){
            throw new ApiError(404, "User not found")
        }
        res.status(200).json({ data: user })
    }
    catch(error){
        throw new ApiError(404, error?.message || "User not found")
    }
})

// get geopgraphy of all users
const getGeography = asyncHandler(async(req, res) => {
    try{
        // Fetch all users from the database
        const users = await prisma.user.findMany();
        // Map and count locations by country
        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country);
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});

        // Format the location data
        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count };
            }
        );

        // Send success response with formatted location data
        res.status(200).json({ data: formattedLocations });
    }
    catch(error){
        throw new ApiError(404, error?.message || "Geography Data not found")
    }
})

export {
    getUser,
    getGeography
}