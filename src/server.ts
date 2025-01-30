import Express from "express";

interface IProps {
    req: Request,
    res: Response
}

const app = Express();
app.use(Express.json());

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
});

app.get('/', (req, res): IProps => {
    return res.send({ message: 'Hello World' });
})