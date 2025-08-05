import express from "express";
import { createServer } from "http";
import { prismaDB, connectDB } from "./data/prisma_connect";

const app = express();
const server = createServer(app);

connectDB();

app.get("/", async (req, res) => {
    const data = await prismaDB.user.findMany();
    console.log("Data fetched from the database:", data);
    return res.status(200).json({
        message: "Fetched data successfully.",
        status: "success",
        data: data,
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
