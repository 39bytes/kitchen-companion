import axios from "axios";
import express from "express";
import { getExpirationOrDefault } from "../expiration";
import { RecipeByIngredientResult, RecipeIngredient } from "../models/recipe";
import { Ingredient } from "../models/userfridge";
import { ProcessIngredientResults } from "../utils/process-ingredient-results";

/**
 * Wrapper endpoints for Spoonacular API.
 */

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
 * Ingredient search, returning entries sorted by relevance.
 * Does some post-processing to remove useless data from the API response.
 * @route GET /api/ingredient/search
 * @param {string} query - Ingredient name to search for.
 * @param {number} number - Number of results to return. Default 10.
 * @returns {Ingredient[]} - Array of ingredients.
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
 * @param {string} query - Ingredient name to search for.
 */
router.get("/ingredient/expiration", (req, res) => {
  const query = req.query.query as string;

  res.json(getExpirationOrDefault(query));
});

/**
 * Recipe search by ingredient.
 * @route GET /api/recipes/searchByIngredient
 * @param {string} ingredients - Comma-separated list of ingredients.'
 * @param {number} number - Number of results to return. Default 10.
 * @returns {RecipeByIngredientResult[]} - Array of recipes.
 */
router.get("/recipes/searchByIngredient", async (req, res) => {
  const ingredients = req.query.ingredients;
  const number = req.query.number ?? "10";

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

/** Recipe search by ID.
 * @route GET /api/recipes/searchById
 * @param {number} id - Recipe ID.
 * @returns {Recipe} - Recipe data.
 */

router.get("/recipes/searchById", async (req, res) => {
  const recipeId = req.query.id;

  const data = await getFromSpoonacular<RecipeByIdResult>(
    `recipes/${recipeId}/information`
  );

  let instructionsList;
  if (data.analyzedInstructions.length > 0) {
    instructionsList = data.analyzedInstructions[0].steps.map((s) => s.step);
  }

  let ingredientsList;
  if (data.extendedIngredients.length > 0) {
    ingredientsList = data.extendedIngredients.map((i) => i.original);
  }

  res.json({ ...data, instructionsList, ingredientsList });
});

export default router;
