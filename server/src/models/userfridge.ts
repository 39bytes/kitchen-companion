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
  expirationData?: ExpirationData;
  quantity: number;
  unit: string;
  dateAdded: number;
  section: FridgeSection;
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
  expirationData: ExpirationDataSchema,
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  dateAdded: Number,
  section: { type: String, required: true },
});

export interface UserFridgeDocument {
  userId: Types.ObjectId;
  contents: FridgeIngredient[];
}

export type UpdateIngredientPayload = {
  ingredientId: string;
  quantity: number;
  unit: string;
  section: FridgeSection;
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
