import prisma from "../utils/prismadb.js"
import {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat,
  } from  "./mock-data.js"

const insertMockData = async () => {
    try {
        /* ONLY ADD DATA ONE TIME node insertMockData.js*/
        await prisma.user.createMany({
            data: dataUser
        });

        // await prisma.product.createMany({
        //     data: dataProduct
        // });

        // await prisma.productStat.createMany({
        //     data: dataProductStat
        // });

        // await prisma.transaction.createMany({
        //     data: dataTransaction
        // });

        // await prisma.overallStat.createMany({
        //     data: dataOverallStat
        // });

        console.log("Mock data inserted successfully");

    } catch (error) {
        console.error("Error inserting mock data:", error);
    }
};