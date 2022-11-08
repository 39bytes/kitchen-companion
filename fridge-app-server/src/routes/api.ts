import { ExpirationData, Ingredient, IngredientSearchResult } from '../models/ingredient';
import fuzzysort from 'fuzzysort';
import { durationToMs } from '../utils/duration-to-ms';
import { ProcessIngredientResults } from '../utils/process-ingredient-results';
import express, { application } from 'express';

const router = express.Router();

type IngredientSearchResponse = {
    results: IngredientSearchResult[],
    offset: number,
    number: number,
    totalResults: number
}

/**
 * Ingredient search, returning 10 entries sorted by relevance.
 * @route GET /api/ingredient/search
 */
router.get('/ingredient/search', async (req, res) => {
    const query = req.query.query as string;

    const data = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&number=10&metaInformation=true`, {
        method: "GET",
        headers: {
            "x-api-key": process.env.SPOONACULAR_API_KEY,
            "Access-Control-Allow-Origin": "*"
        }
    });

    // Sort results
    const json = await data.json() as IngredientSearchResponse;

    const processedResults = ProcessIngredientResults(query, json.results);
    res.json(processedResults);
})

/**
 * Ingredient expiration data (pantry, fridge, freezer).
 * @route GET /api/ingredient/expiration
 */
router.get('/ingredient/expiration', (req, res) => {
    const query = req.query.query as string;

    // Get all food names from expiration database
    const names = Object.keys(expirations);
    // Fuzzy string match
    const scores = fuzzysort.go(query, names);
    const foodName = scores[0].target;

    // Get matching expiration data
    res.json(expirations[foodName]);
})

// Times in milliseconds
const expirations: { [name: string]: ExpirationData } = {
    "banana": {
        pantry: durationToMs("3d"),
        fridge: durationToMs("2w"),
        freezer: durationToMs("6m"),
    }
}

export default router;


