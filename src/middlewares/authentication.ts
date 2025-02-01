import { Request, Response } from "express";
import { prisma } from "../database/index";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const jwtSecret = process.env.PASS_JWT!;

export class Authentication {

    async authenticate(request: Request, response: Response) {
        const { email, password } = request.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return response.json({ error: "User not Found" })
        }

        const isValuePassword = await compare(password, user.password);

        if (!isValuePassword) {
            return response.json({ message: "Password Invalid" })
        }

        const token = sign({ id: user.id }, jwtSecret, { expiresIn: "1d" })

        const { id } = user;

        return response.json({ user: { id, email }, token });


    }
}