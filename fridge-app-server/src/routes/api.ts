import {
  ExpirationData,
  FridgeIngredient,
  Ingredient,
} from "../models/userfridge";
import fuzzysort from "fuzzysort";
import { durationToMs } from "../utils/duration-to-ms";
import { ProcessIngredientResults } from "../utils/process-ingredient-results";
import express, { application } from "express";
import axios from "axios";
import { getExpirationOrDefault } from "../expiration";

const router = express.Router();

type IngredientSearchResponse = {
  results: Ingredient[];
  offset: number;
  number: number;
  totalResults: number;
};

/**
 * Ingredient search, returning 10 entries sorted by relevance.
 * @route GET /api/ingredient/search
 */
router.get("/ingredient/search", async (req, res) => {
  const query = req.query.query as string;
  const number = req.query.number ?? "10";

  const resp = await axios.get(
    `https://api.spoonacular.com/food/ingredients/search`,
    {
      headers: {
        "x-api-key": process.env.SPOONACULAR_API_KEY,
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        query,
        number,
        metaInformation: true,
      },
    }
  );

  // Sort results
  const data = (await resp.data) as IngredientSearchResponse;

  const processedResults = ProcessIngredientResults(query, data.results);
  res.json(processedResults);
});

/**
 * Ingredient expiration data (pantry, fridge, freezer).
 * @route GET /api/ingredient/expiration
 */
router.get("/ingredient/expiration", (req, res) => {
  const query = req.query.query as string;

  res.json(getExpirationOrDefault(query));
});

export default router;
