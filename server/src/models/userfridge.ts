import mongoose, { Schema, Types } from "mongoose";
export type FridgeSection = "pantry" | "fridge" | "freezer";

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

const ExpirationDataSchema = new Schema({
  pantry: Number,
  fridge: Number,
  freezer: Number,
});

const FridgeIngredientSchema = new Schema<FridgeIngredient>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  aisle: { type: String, required: true },
  possibleUnits: [String],
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  dateAdded: Number,
});

export interface UserFridgeDocument {
  userId: Types.ObjectId;
  contents: FridgeIngredient[];
}

export type UpdateIngredientPayload = {
  ingredientId: string;
  quantity: number;
  unit: string;
};

const UserFridgeSchema = new Schema<UserFridgeDocument>({
  userId: Schema.Types.ObjectId,
  contents: { type: [FridgeIngredientSchema], required: true },
});

const userFridgeModel = mongoose.model<UserFridgeDocument>(
  "UserFridge",
  UserFridgeSchema,
  "user_fridge"
);
export default userFridgeModel;
