import { IngredientSearchResponse, IngredientSearchResult } from './types/ingredient-types';
import toTime from 'to-time';
import fuzzysort from 'fuzzysort';

// TODO: Fix CORS
export const IngredientSearch = async (query: string, number: number) => {
    const res = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&number=${number}&metaInformation=true`, {
        method: "GET",
        headers: {
            "x-api-key": process.env.SPOONACULAR_API_KEY,
            "Access-Control-Allow-Origin": "*"
        }
    });
    // Sort r
    const resp = await res.json() as IngredientSearchResponse;
    console.log(resp);
    return resp;

    const resultsSorted = SortIngredientResults(query, resp.results);
    return resultsSorted;
}

const SortIngredientResults = (query: string, results: IngredientSearchResult[]) => {
    const names = results.map(ing => ing.name);
    const scores = fuzzysort.go(query, names);

    let sorted: IngredientSearchResult[] = [];
    scores.forEach(obj => {
        sorted.push(results.find(result => result.name === obj.target));
    })
    return sorted;
}

// Times in milliseconds
type ExpirationData = {
    pantry: number;
    fridge: number;
    freezer: number;
}

const expirations = {
    "apple": {
        pantry: toTime("3d"),
        fridge: toTime("2w"),
        freezer: toTime("26w")
    }
}

// const allFoodNames = fuzzysort.prepare();


const GetIngredientExpirationData = (query: string) => {
    // Get all food names from expiration database
    const names = Object.keys(expirations);
    // Fuzzy string match
    const foodName = fuzzysort.go(query, names);

    // Get matching expiration data

}