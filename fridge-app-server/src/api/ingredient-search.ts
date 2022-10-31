import { ExpirationData, Ingredient, IngredientSearchResult } from './types/ingredient-types';
import toTime from 'to-time';
import fuzzysort from 'fuzzysort';
import { durationToMs } from '../utils/duration-to-ms';

type IngredientSearchResponse = {
    results: IngredientSearchResult[],
    offset: number,
    number: number,
    totalResults: number
}

export const IngredientSearch = async (query: string, number: number) => {
    const res = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&number=${number}&metaInformation=true`, {
        method: "GET",
        headers: {
            "x-api-key": process.env.SPOONACULAR_API_KEY,
            "Access-Control-Allow-Origin": "*"
        }
    });

    // Sort results
    const resp = await res.json() as IngredientSearchResponse;

    const results = ProcessIngredientResults(query, resp.results);
    return results;
}

export const IngredientExpiration = (query: string) => {
    // Get all food names from expiration database
    const names = Object.keys(expirations);
    // Fuzzy string match
    const scores = fuzzysort.go(query, names);
    const foodName = scores[0].target;

    // Get matching expiration data
    return expirations[foodName];
}

const USEFUL_UNITS = ["g", "oz", "kg", "mL", "L", "large", "small", "slice", "piece", "cup", "bunch"]

const ProcessIngredientResults = (query: string, results: IngredientSearchResult[]) => {
    // Sorts by name (because spoonacular does not already do this by default for some reason)
    const names = results.map(ing => ing.name);
    const scores = fuzzysort.go(query, names);

    let sorted: IngredientSearchResult[] = [];
    scores.forEach(obj => {
        const result = results.find(r => r.name === obj.target);

        // Throw out useless units that just take up space
        const filteredUnits = USEFUL_UNITS.filter((unit) => result.possibleUnits.includes(unit));
        sorted.push({ ...result, possibleUnits: filteredUnits });
    })
    return sorted;
}

// Times in milliseconds
const expirations: { [name: string]: ExpirationData } = {
    "banana": {
        pantry: durationToMs("3d"),
        fridge: durationToMs("2w"),
        freezer: durationToMs("6m"),
    }
}

