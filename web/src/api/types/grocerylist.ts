import { Types } from "mongoose";
import { Ingredient } from "./userfridge";

export interface GroceryIngredient extends Ingredient {
  quantity: number;
  unit: string;
  purchased: boolean;
}

export interface GroceryListDocument {
  userId: Types.ObjectId;
  items: GroceryIngredient[];
}
