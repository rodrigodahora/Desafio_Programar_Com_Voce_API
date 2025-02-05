import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { Authentication } from "../middlewares/authentication";
import { AuthMiddleware } from "../middlewares/auth";
import { ProductController } from "../controllers/ProductsController";
import { UserLogin } from "../controllers/UserLogin";
import { OrderController } from "../controllers/OrderController";

export const router = Router();


const productcontroller = new ProductController();
const usercontroller = new UserController();
const authentication = new Authentication();
const userlogin = new UserLogin();
const ordercontroller = new OrderController();

router.get("/users", usercontroller.index);
router.get("/products", productcontroller.getAllItems);
router.post("/login", userlogin.login);
router.post("/register", usercontroller.createUser);
router.post("/verifyUser", AuthMiddleware, usercontroller.verifyUser);
router.post("/auth", authentication.authenticate);
router.post("/finalizePurchase", AuthMiddleware, ordercontroller.finalizePurchase);
router.patch("/products/stock", ordercontroller.updateStock);
