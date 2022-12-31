import { FridgeIngredient, Ingredient } from "../types/userfridge";

const nameComparator = (a: Ingredient, b: Ingredient) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

// export const groupIngredientsBy = (
//   items: FridgeIngredient[],
//   key: "section" | "category",
//   sortBy: "name" | "expiration" = "name"
// ) => {
//   let sections = new Map<string, FridgeIngredient[]>();

//   for (const ingredient of items) {
//     let arr = sections.get(ingredient[key]);
//     if (arr) {
//       arr.push(ingredient);
//     } else {
//       sections.set(ingredient[key], [ingredient]);
//     }
//   }

//   let comparator;
//   switch (sortBy) {
//     case "name":
//       comparator = nameComparator;
//       break;
//     case "expiration":
//       comparator = expirationComparator;
//       break;
//   }

//   for (const arr of sections.values()) {
//     arr.sort(comparator);
//   }

//   return sections;
// };

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

export const groupIngredientsBySection = (ingredients: FridgeIngredient[]) => {
  let sections = new Map<string, FridgeIngredient[]>();

  for (const ingredient of ingredients) {
    let arr = sections.get(ingredient.section);
    if (arr) {
      arr.push(ingredient);
    } else {
      sections.set(ingredient.section, [ingredient]);
    }
  }
  return sections;
};
