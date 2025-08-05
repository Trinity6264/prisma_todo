import { PrismaClient } from '../../generated/prisma';
// This file is used to create a Prisma client instance that can be imported in other files.

const prismaDB = new PrismaClient();

const connectDB = async () => {
    try {
        await prismaDB.$connect();
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

export { prismaDB, connectDB };
