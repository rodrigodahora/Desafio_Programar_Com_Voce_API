import express from "express";
import { router } from "./routers/routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})