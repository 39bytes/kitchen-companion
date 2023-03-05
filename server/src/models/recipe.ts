import mongoose, { Schema, Types } from "mongoose";

export type RecipeByIngredientResult = {
  id: number;
  title: string;
  image: string;
};

export const DishTypes = ["breakfast", "lunch", "dinner", "dessert"] as const;
export type DishType = typeof DishTypes[number];

export interface Recipe {
  userId: Types.ObjectId;
  id?: number;
  title: string;
  dishType?: DishType;
  image?: string;
  servings?: number;
  readyInMinutes?: number;
  sourceUrl?: string;
  extendedIngredients?: RecipeIngredient[];
  ingredientsList: string[];
  instructions?: string;
  instructionsList: string[];
}

export interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

const RecipeIngredientSchema = new Schema<RecipeIngredient>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  amount: Number,
  unit: String,
  original: { type: String, required: true },
});

const RecipeSchema = new Schema<Recipe>({
  userId: { type: Schema.Types.ObjectId, required: true },
  id: { type: Number },
  title: { type: String, required: true },
  image: { type: String },
  servings: { type: Number },
  readyInMinutes: { type: Number },
  sourceUrl: { type: String },
  dishType: { type: String, enum: DishTypes, default: "breakfast" },
  extendedIngredients: { type: [RecipeIngredientSchema] },
  ingredientsList: { type: [String] },
  instructions: { type: String },
  instructionsList: { type: [String] },
});

const recipeModel = mongoose.model<Recipe>("Recipes", RecipeSchema, "recipes");

export default recipeModel;
