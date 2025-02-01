import { Request, Response } from "express";
import { prisma } from "../database";
import { hash } from "bcrypt";

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
}