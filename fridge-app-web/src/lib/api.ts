import { expirationTimes } from "./testData";
import { ExpirationData, IngredientSearchResult } from "@backend/ingredient"
import axios from 'axios';

export const getIngredientSearch = async (query: string, number: number) => {
    const res = await axios.get(`http://localhost:8080/api/ingredient/search?query=${query}&number=${number}`);
    return res.data as IngredientSearchResult[];
}

export const getIngredientExpiration = async (query: string) => {
    const res = await axios.get(`http://localhost:8080/api/ingredient/expiration?query=${query}`);
    return res.data as ExpirationData;
}

// const LoadTop1kIngrdients = () => {
//     const data = fs.readFileSync("top-1k-ingredients.csv").toString().split('\n');

//     const top1kIngredients = data.map(x => {
//         const [name, id] = x.split(';');
//         return {name, id}
//     });

//     return top1kIngredients;
// }

// const Top1kIngredients = LoadTop1kIngrdients();



