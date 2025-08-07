import express from "express";
import { createServer } from "http";
import { config } from 'dotenv'
import { prismaDB, connectDB } from "./data/prisma_connect";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth_route";
import notFound from "./middleware/not_found";
import errorHandler from "./helper/error_handler";

config();

const app = express();
const server = createServer(app);

connectDB();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(errorHandler);


// app.get("/", async (req, res) => {
//     const data = await prismaDB.user.findMany();
//     console.log("Data fetched from the database:", data);
//     return res.status(200).json({
//         message: "Fetched data successfully.",
//         status: "success",
//         data: data,
//     });
// });

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
