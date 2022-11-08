import { expirationTimes } from "./testData";
import { ExpirationData, IngredientSearchResult } from "@backend/ingredient"

export const IngredientSearch = async (query: string, number: number) => {
    const res = await fetch(`http://localhost:8080/ingredient/search?query=${query}&number=${number}`);
    const data = await res.json() as IngredientSearchResult[];
    return data;
}

export const IngredientExpiration = async (query: string) => {
    const res = await fetch(`http://localhost:8080/ingredient/expiration?query=${query}`);
    const data = await res.json() as ExpirationData;
    return data;
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



