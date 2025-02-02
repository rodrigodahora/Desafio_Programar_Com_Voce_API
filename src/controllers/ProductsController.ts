import { prisma } from "../database";
import { Request, Response } from "express"

export class ProductController {

    async getAllItems(request: Request, response: Response) {
        const items = await prisma.product.findMany()

        return response.json({ items })
    }
}