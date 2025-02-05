import { request, Request, Response } from "express";
import { prisma } from "../database";
import { hash } from "bcrypt";
import { AuthMiddleware } from "../middlewares/auth";

export class UserController {
    async index(request: Request, response: Response) {
        const users = await prisma.user.findMany();
        return response.json({ users });
    }


    async createUser(request: Request, response: Response) {
        try {
            const { name, email, password } = request.body;
            const userExist = await prisma.user.findUnique({ where: { email } });

            if (userExist) {
                return response.status(400).json({
                    error: true,
                    message: "User already exists"
                })
            }

            const hash_password = await hash(password, 8);

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash_password
                },

            });

            return response.json({ newUser })


        } catch (error) {
            return console.error(error)
        }

    }

    async verifyUser(request: Request, response: Response) {
        const { name, email } = request.body;
        const userId = request.userId;

        if (!userId || isNaN(Number(userId))) {
            return response.status(400).json({
                message: "Invalid or missing user ID"
            });
        }

        const userIdNumber = Number(userId);

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userIdNumber
                },
            });

            if (!user) {
                return response.status(400).json({
                    message: "User not found"
                })
            };

            if (user.name !== name || user.email !== email) {
                return response.status(200).json({
                    message: "Name or Email does not match!"
                })
            };

            return response.status(200).json({ message: "User verified successfully!" })



        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: true,
                message: "Error verifying user data."
            })

        };
    }
}

