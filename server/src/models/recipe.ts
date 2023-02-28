import mongoose, { Schema, Types } from "mongoose";

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

const RecipeIngredientSchema = new Schema<RecipeIngredient>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  amount: Number,
  unit: String,
  original: { type: String, required: true },
});

const RecipeSchema = new Schema<Recipe>({
  userId: { type: Schema.Types.ObjectId, required: true },
  id: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String },
  servings: { type: Number, required: true },
  readyInMinutes: { type: Number, required: true },
  sourceUrl: { type: String, required: true },
  extendedIngredients: { type: [RecipeIngredientSchema], required: true },
  instructions: { type: String },
  instructionsList: { type: [String] },
});

const recipeModel = mongoose.model<Recipe>("Recipes", RecipeSchema, "recipes");

export default recipeModel;
