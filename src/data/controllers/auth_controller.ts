import AsyncWrapper from "../../helper/async_wrapper";
import { Request, Response } from "express";


const loginAuth = AsyncWrapper(async (req: Request, res: Response) => {
    // Your login logic here
    res.status(200).json({
        message: "Login successful",
        status: "success",
    });
});

const registerAuth = AsyncWrapper(async (req: Request, res: Response) => {
    // Your registration logic here
    res.status(201).json({
        message: "Registration successful",
        status: "success",
    });
});


const refreshAuth = AsyncWrapper(async (req: Request, res: Response) => {
    // Your refresh token logic here
    res.status(200).json({
        message: "Token refreshed successfully",
        status: "success",
    });
});

export { loginAuth, registerAuth, refreshAuth };