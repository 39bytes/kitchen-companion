import { Types } from "mongoose";

// export type FridgeSection = "pantry" | "fridge" | "freezer";

export interface Ingredient {
  id: number;
  name: string;
  image: string;
  aisle: string;
  possibleUnits: string[];
}

export interface FridgeIngredient extends Ingredient {
  _id: Types.ObjectId;
  quantity: number;
  unit: string;
  dateAdded: number;
}

export interface ExpirationData {
  pantry?: number;
  fridge?: number;
  freezer?: number;
}

export interface UserFridgeDocument {
  userId: Types.ObjectId;
  contents: FridgeIngredient[];
}

export type UpdateIngredientPayload = {
  ingredientId: string;
  quantity: number;
  unit: string;
};
