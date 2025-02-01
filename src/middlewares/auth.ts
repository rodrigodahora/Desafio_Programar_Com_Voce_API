import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
}

const jwtSecret = process.env.PASS_JWT!;

export function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ message: "Token not provided!" });
    }

    const [, token] = authorization.split(" ");

    try {
        const decode = verify(token, jwtSecret);
        const { id } = decode as TokenPayload;

        request.userId = id;

        next();

    } catch (error) {
        return response.status(401).json({ error: "Token invalid" });
    }

}