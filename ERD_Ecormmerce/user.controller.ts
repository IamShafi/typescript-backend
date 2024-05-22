import { ApiError } from "../src/utils/ApiError.js";
import { asyncHandler } from "../src/utils/asyncHandler.js";
import prisma from "../src/utils/prismadb.js";
import getCountryIso3 from "country-iso-2-to-3";

const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json({ data: user });
  } catch (error) {
    throw new ApiError(404, error?.message || "User not found");
  }
});

// get geopgraphy of all users
const getGeography = asyncHandler(async (req, res) => {
  try {
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
    /**
    * // Extract unique countries from user data
            const uniqueCountries = Array.from(new Set(dataUser.map(user => user.country)));
            const mappedLocations = users.reduce((acc, { country }) => {
    if (!acc[country]) {
        acc[country] = 0;
    }
    acc[country]++;
    return acc;
}, {});

// Format the location data
const formattedLocations = Object.entries(mappedLocations).map(
    ([country, count]) => {
        return { id: country, value: count };
    }
// mappedLocations:
// { "US": 2, "CA": 2, "MX": 1 }

// formattedLocations:
// [
//   { id: "US", value: 2 },
//   { id: "CA", value: 2 },
//   { id: "MX", value: 1 }
// ]
);
         */

    // Send success response with formatted location data
    res.status(200).json({ data: formattedLocations });
  } catch (error) {
    throw new ApiError(404, error?.message || "Geography Data not found");
  }
});

export { getUser, getGeography };
