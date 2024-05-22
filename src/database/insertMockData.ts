import prisma from "../utils/prismadb.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./mock-data.js";

// interfaces.ts
 interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    city: string;
    state: string | null;
    country: string;
    occupation: string;
    phoneNumber: string;
    transactions: string[];
    role: 'USER' | 'ADMIN' | 'SUPERADMIN';
  }
  
   interface Product {
    id: string;
    productId: string;
    name: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    supply: number;
  }
  
   interface ProductStat {
    id: string;
    productId: string;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData: any;
    dailyData: any;
  }
  
   interface Transaction {
    id: string;
    userId: string;
    cost: string;
    products: string[];
  }
  
   interface OverallStat {
    id: string;
    totalCustomers: number;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData: any;
    dailyData: any;
    salesByCategory: any;
  }
  
   interface AffiliateStat {
    id: string;
    userId: string;
    affiliateSales: string[];
  }
  
const insertMockData = async (): Promise<void> => {
  try {
    /* ONLY ADD DATA ONE TIME */
    await prisma.user.createMany({
        data: dataUser as User[]
    });

    await prisma.product.createMany({
        data: dataProduct as Product[]
    });

    // await prisma.productStat.createMany({
    //     data: dataProductStat as ProductStat[]
    // });

    // await prisma.transaction.createMany({
    //     data: dataTransaction as Transaction[]
    // });

    // await prisma.overallStat.createMany({
    //     data: dataOverallStat as OverallStat[]
    // });

    // await prisma.affiliateStat.createMany({
    //     data: dataAffiliateStat as AffiliateStat[]
    // });

    console.log("Mock data inserted successfully");

  } catch (error) {
    console.error("Error inserting mock data:", error);
  }
};

insertMockData();
