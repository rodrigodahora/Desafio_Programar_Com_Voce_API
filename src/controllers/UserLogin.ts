import { Request, Response } from "express";
import { prisma } from "../database";
import { sign } from "jsonwebtoken";

import { hash, compare } from "bcrypt";

const jwtSecret = process.env.PASS_JWT!;

export class UserLogin {
    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        try {

            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                return response.status(404).json({ message: "invalid credentials" });
            }

            const validPassword = await compare(password, user.password);

            if (!validPassword) {
                return response.status(400).json({ message: "Invalid credentials" });
            }


            const token = sign({ id: user.id }, jwtSecret, { expiresIn: '8h' });

            const { password: _, ...loggedUser } = user;

            return response.status(200).json({ token, user: loggedUser, name: loggedUser.name });


        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor!' });
        }
    }
}