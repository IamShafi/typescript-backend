import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../utils/prismadb.js";

const getSales = asyncHandler(async (req, res) => {
  try {
    // Fetch overall statistics using Prisma
    const overallStats = await prisma.overallStat.findMany();

    if (overallStats.length === 0) {
      throw new ApiError(404, "No sales data found");
    }

    // Return the first entry of overallStats
    res.status(200).json({ data: overallStats[0] });
  } catch (error) {
    // Handle errors
    throw new ApiError(404, error?.message || "Failed to fetch sales data");
  }
});

export {
  getSales
};
