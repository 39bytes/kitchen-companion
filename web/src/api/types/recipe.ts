import { Types } from "mongoose";

export type RecipeByIngredientResult = {
  id: number;
  title: string;
  image: string;
};

export interface Recipe {
  _id: string;
  userId: string;
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  extendedIngredients: RecipeIngredient[];
  ingredientsList: string[];
  instructions: string;
  instructionsList: string[];
}

export interface CustomRecipe {}

export interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}
