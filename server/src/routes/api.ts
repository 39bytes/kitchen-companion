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
import {
  Recipe,
  RecipeByIngredientResult,
  RecipeIngredient,
} from "../models/recipe";

const router = express.Router();

type IngredientSearchResponse = {
  results: Ingredient[];
  offset: number;
  number: number;
  totalResults: number;
};

export const getFromSpoonacular = async <T>(
  endpoint: string,
  params?: object
) => {
  const res = await axios.get(`https://api.spoonacular.com/` + endpoint, {
    headers: {
      "x-api-key": process.env.SPOONACULAR_API_KEY,
      "Access-Control-Allow-Origin": "*",
    },
    params,
  });

  return res.data as T;
};

/**
 * Ingredient search, returning 10 entries sorted by relevance.
 * @route GET /api/ingredient/search
 */
router.get("/ingredient/search", async (req, res) => {
  const query = req.query.query as string;
  const number = req.query.number ?? "10";

  const data = await getFromSpoonacular<IngredientSearchResponse>(
    "food/ingredients/search",
    {
      query,
      number,
      metaInformation: true,
    }
  );

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

router.get("/recipes/searchByIngredient", async (req, res) => {
  const ingredients = req.query.ingredients;
  const number = req.query.number;

  const data = await getFromSpoonacular<RecipeByIngredientResult[]>(
    "recipes/findByIngredients",
    {
      query: "",
      includeIngredients: ingredients,
      instructionsRequired: true,
      sort: "popularity",
      number,
    }
  );

  console.log(data);
  res.json(data);
});

export type AnalyzedInstructions = {
  steps: { step: string }[];
};

export type RecipeByIdResult = {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  extendedIngredients: RecipeIngredient[];
  instructions: string;
  analyzedInstructions: AnalyzedInstructions[];
};

router.get("/recipes/searchById", async (req, res) => {
  const recipeId = req.query.id;

  const data = await getFromSpoonacular<RecipeByIdResult>(
    `recipes/${recipeId}/information`
  );

  let instructionsList;
  if (data.analyzedInstructions.length > 0) {
    instructionsList = data.analyzedInstructions[0].steps.map((s) => s.step);
  }

  res.json({ ...data, instructionsList });
});

export default router;
