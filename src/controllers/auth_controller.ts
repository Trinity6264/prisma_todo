import AsyncWrapper from "../helper/async_wrapper";
import { Request, Response } from "express";
import { prismaDB } from "../data/prisma_connect";
import ConflictError from "../errors/conflict_error";
import { decryptPassword, encryptPassword } from "../helper/ecryption_helper";
import jsWebToken from 'jsonwebtoken'
import ForbiddenError from "../errors/forbidden_error";


const loginAuth = AsyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Your login logic here
    const user = await prismaDB.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
        },
    });
    if (!user) {
        throw new ConflictError('User not found with this email');
    }

    // check password
    const isPasswordValid = await decryptPassword(password, user.password);
    if (!isPasswordValid) {
        throw new ConflictError('Invalid password');
    }
    // Generate and return JWT token or session here
    const data = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    const access_token: string = jsWebToken.sign(data, process.env.ACCESS_JWT_SECRET!, {
        expiresIn: '30m'
    })
    const refresh_token: string = jsWebToken.sign(data, process.env.REFRESH_JWT_SECRET!, {
        expiresIn: '30 days'
    })

    // Store or update refresh token in database
    await prismaDB.refreshToken.upsert({
        where: {
            userId: user.id,
        },
        update: {
            token: refresh_token,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
        create: {
            token: refresh_token,
            userId: user.id,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
    });

    // Assuming password validation is done here
    res.status(200).json({
        message: "Login successful",
        status: "success",
        data: { access_token: access_token, refresh_token: refresh_token },
    });
});

const registerAuth = AsyncWrapper(async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    // check if user already exists
    const existingUser = await prismaDB.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
        },
    });

    if (existingUser) {
        throw new ConflictError('User already exists with this email');
    }

    // create new user
    const hashedPassword = await encryptPassword(password);
    await prismaDB.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword,
        },
    });

    res.status(201).json({
        message: "Registration successful",
        status: "success",
        data: {},
    });
});

const refreshToken = AsyncWrapper(async (req: Request, res: Response) => {
    const { token } = req.body;

    // Find the refresh token and include user data
    const tokenResults = await prismaDB.refreshToken.findUnique({
        where: {
            token: token,
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            },
        },
    });

    if (!tokenResults) {
        throw new ForbiddenError('Invalid refresh token');
    }

    // Check if token has expired
    if (new Date() > tokenResults.expiresAt) {
        // Delete expired token
        await prismaDB.refreshToken.delete({
            where: {
                id: tokenResults.id,
            },
        });
        throw new ForbiddenError('Refresh token has expired');
    }

    // Generate new access token
    const userData = {
        id: tokenResults.user.id,
        username: tokenResults.user.username,
        email: tokenResults.user.email,
    };

    const new_access_token: string = jsWebToken.sign(userData, process.env.ACCESS_JWT_SECRET!, {
        expiresIn: '30m'
    });

    // Optionally generate a new refresh token (token rotation for better security)
    const new_refresh_token: string = jsWebToken.sign(userData, process.env.REFRESH_JWT_SECRET!, {
        expiresIn: '30 days'
    });

    // Update the refresh token in database
    await prismaDB.refreshToken.update({
        where: {
            id: tokenResults.id,
        },
        data: {
            token: new_refresh_token,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
    });

    res.status(200).json({
        message: "Token refreshed successfully",
        status: "success",
        data: { 
            access_token: new_access_token, 
            refresh_token: new_refresh_token 
        },
    });
});

export { loginAuth, registerAuth, refreshToken };