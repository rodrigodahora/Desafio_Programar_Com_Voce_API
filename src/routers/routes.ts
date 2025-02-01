import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import { Authentication } from "../middlewares/authentication";
import { AuthMiddleware } from "../middlewares/auth";

export const router = Router();

const usercontroller = new UserController();
const authentication = new Authentication();


router.get("/", async (request: Request, response: Response) => {
    return response.json({ message: "Hello World" })
});

router.get("/users", AuthMiddleware, usercontroller.index);
router.post("/register", usercontroller.createUser);
router.post("/auth", authentication.authenticate);