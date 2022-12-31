import mongoose, { Schema, Types } from "mongoose";
import { Ingredient } from "./userfridge";

export interface GroceryIngredient extends Ingredient {
  quantity: number;
  unit: string;
  purchased: boolean;
}

const GroceryItemSchema = new Schema<GroceryIngredient>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  aisle: { type: String, required: true },
  possibleUnits: [String],
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  purchased: { type: Boolean, required: true },
});

export interface GroceryListDocument {
  userId: Types.ObjectId;
  items: GroceryIngredient[];
}

const GroceryListSchema = new Schema<GroceryListDocument>({
  userId: Schema.Types.ObjectId,
  items: { type: [GroceryItemSchema], required: true },
});

const groceryListModel = mongoose.model<GroceryListDocument>(
  "GroceryList",
  GroceryListSchema,
  "grocery_list"
);
export default groceryListModel;
