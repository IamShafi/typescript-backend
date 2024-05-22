import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../utils/prismadb.js";

const getProducts = asyncHandler(async (req, res) => {
    try {
        // Fetch all products using Prisma
        const products = await prisma.product.findMany();

        // Fetch product stats for each product and combine the data
        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stats = await prisma.productStat.findMany({
                    where: { productId: product.id },
                });
                return {
                    ...product,
                    stats, // Include the stats in the product data
                };
            })
        );

        // Send success response with products and their stats
        res.status(200).json({ data: productsWithStats });
    } catch (error) {
        // Handle errors
        throw new ApiError(404, error?.message || "Products not found");
    }
});

export {
    getProducts
};
