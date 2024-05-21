import { PrismaClient } from '@prisma/client';
import colors from 'colors';

const prisma = new PrismaClient();

const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log(`🚀 Prisma connected to MongoDB`.cyan.underline);
    return prisma;
  } catch (error) {
    console.log(colors.red("Prisma connection FAILED"), error);
    process.exit(1);
  }
};

export default connectToDatabase;
