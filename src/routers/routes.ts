import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import { Authentication } from "../middlewares/authentication";
import { AuthMiddleware } from "../middlewares/auth";
import { ProductController } from "../controllers/ProductsController";
import { UserLogin } from "../controllers/UserLogin";

export const router = Router();


const productcontroller = new ProductController();
const usercontroller = new UserController();
const authentication = new Authentication();
const userlogin = new UserLogin();

router.get("/users", usercontroller.index);
router.get("/products", productcontroller.getAllItems);
router.post("/login", userlogin.login);
router.post("/register", usercontroller.createUser);
router.post("/auth", authentication.authenticate);