import express from "express";
import { router } from "./routers/routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

console.log(process.env.DATABASE_URL);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})