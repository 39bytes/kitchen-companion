import { FridgeIngredient, Ingredient } from "../api/types/userfridge";

export const groupIngredientsByAisle = <T extends Ingredient>(
  ingredients: T[]
) => {
  let sections = new Map<string, T[]>();

  for (const ingredient of ingredients) {
    let arr = sections.get(ingredient.aisle);
    if (arr) {
      arr.push(ingredient);
    } else {
      sections.set(ingredient.aisle, [ingredient]);
    }
  }
  return sections;
};
