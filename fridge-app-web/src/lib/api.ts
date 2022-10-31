import { expirationTimes } from "./testData";
import { IngredientSearchResponse, IngredientSearchResult } from "@backend/types/ingredient-types"

export const IngredientSearch = async (query: string, number: number) => {
    const res = await fetch(`http://localhost:8080/ingredient-search?query=${query}&number=${number}`);
    const data = await res.json() as IngredientSearchResult[];
    return data;
}

export const GetIngredientExpiration = (id: number, storageType: "pantry" | "fridge" | "frozen") => {
    return expirationTimes[id][storageType];
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



