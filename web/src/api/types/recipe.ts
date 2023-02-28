import { Types } from "mongoose";

export type RecipeByIngredientResult = {
  id: number;
  title: string;
  image: string;
};

export interface Recipe {
  userId: Types.ObjectId;
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  extendedIngredients: RecipeIngredient[];
  instructions: string;
  instructionsList?: string[];
}

export interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}
