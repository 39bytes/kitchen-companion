import { ExpirationData, Ingredient } from "@backend/userfridge"
import axios from 'axios';

const getFromAPI = async (endpoint: string, params: object) => {
    const res = await axios.get(process.env.REACT_APP_API_URL + endpoint, { params });
    return res.data;
}

export const getIngredientSearch = async (query: string, number: number) => {
    return await getFromAPI("ingredient/search", { query, number }) as Ingredient[];
}


export const getIngredientExpiration = async (query: string) => {
    return await getFromAPI("ingredient/expiration", { query }) as ExpirationData;
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



