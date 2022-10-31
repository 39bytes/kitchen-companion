import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { IngredientExpiration, IngredientSearch } from './api/ingredient-search';

dotenv.config()
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/ingredient-search', async (req, res) => {
    const result = await IngredientSearch(req.query.query as string, 10);
    res.send(result)
});

app.get('/ingredient-expiration', async (req, res) => {
    const result = IngredientExpiration(req.query.query as string);
    res.send(result)
});


app.listen(PORT, () => {
    return console.log(`Server started on localhost:${PORT}`);
});