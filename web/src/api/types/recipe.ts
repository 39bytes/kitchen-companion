export type RecipeByIngredientResult = {
  id: number;
  title: string;
  image: string;
};

export const DishTypes = ["breakfast", "lunch", "dinner", "dessert"] as const;
export type DishType = typeof DishTypes[number];

export interface Recipe {
  _id: string;
  userId: string;
  id: number;
  title: string;
  dishType?: DishType;
  image: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  extendedIngredients: RecipeIngredient[];
  ingredientsList: string[];
  instructions: string;
  instructionsList: string[];
}

export interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}
