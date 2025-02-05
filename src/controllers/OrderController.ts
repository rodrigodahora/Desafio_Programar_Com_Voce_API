import { Request, Response } from "express";
import { prisma } from "../database";

export class OrderController {

    async updateStock(request: Request, response: Response) {
        const { productId } = request.query;
        const { quantity } = request.body;

        if (typeof productId !== 'string') {
            return response.status(400).json({ error: 'Invalid productId' });
        }

        if (request.method === 'PATCH') {
            try {

                const product = await prisma.product.update({
                    where: { id: parseInt(productId) },
                    data: {
                        stockQuantity: {
                            increment: quantity
                        }
                    },
                });

                return response.status(200).json(product);

            } catch (error) {
                return response.status(500).json({ error: 'Method not Allowed' })
            }
        } else {
            return response.status(405).json({ error: 'Method Not Allowed' });
        }
    }

    async finalizePurchase(request: Request, response: Response) {
        const { name, email, address, cartItems } = request.body;

        if (!name || !email || !address || !cartItems || cartItems.length === 0) {
            return response.status(400).json({ message: "Por favor, forneça todos os dados." })
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.name !== name) {
            return response.status(400).json({ message: "Usuário ou email inválido!" })
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of cartItems) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                return response.status(400).json({ message: `Produto com ID ${item.productId} não encontrado` })
            }

            if (product.stockQuantity < item.quantity) {
                return response.status(400).json({ message: `Estoque insuficiente de ${product.name}` })
            }

            totalAmount += product.price * item.quantity;

            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price
            });

            await prisma.product.update({
                where: { id: item.productId },
                data: {
                    stockQuantity: product.stockQuantity - item.quantity,
                },
            });

        }

        try {
            const newOrder = await prisma.order.create({
                data: {
                    userId: user.id,
                    totalAmount: totalAmount,
                    createdAt: new Date(),
                    orderItems: {
                        create: orderItems,
                    },
                },
                include: {
                    orderItems: true,
                },
            });


            return response.status(200).json({
                message: "Compra finalizada com sucesso!",
                order: newOrder
            })


        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Erro ao registrar o pedido!" })
        }



    }

}