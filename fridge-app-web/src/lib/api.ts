import { expirationTimes } from "./testData";
import { ExpirationData, IngredientSearchResult } from "@backend/ingredient"
import axios from 'axios';

const getFromAPI = async<ResDataType>(endpoint: string, params: object) => {
    const res = await axios.get(process.env.REACT_APP_API_URL + endpoint, { params });
    return res.data as ResDataType;
}

export const getIngredientSearch = async (query: string, number: number) => getFromAPI<IngredientSearchResult[]>("ingredient/search", { query, number });

export const getIngredientExpiration = async (query: string) => getFromAPI<ExpirationData>("ingredient/expiration", { query });


// const LoadTop1kIngrdients = () => {
//     const data = fs.readFileSync("top-1k-ingredients.csv").toString().split('\n');

//     const top1kIngredients = data.map(x => {
//         const [name, id] = x.split(';');
//         return {name, id}
//     });

//     return top1kIngredients;
// }

// const Top1kIngredients = LoadTop1kIngrdients();



